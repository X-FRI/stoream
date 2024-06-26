(* Copyright (c) 2024 The X-Files Research Institute
 * 
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of Stoream nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *)

module Stoream.Engine.Logger.StoreamLogger

open System
open System.IO
open System.Text
open System.Globalization

type LogLevel =
  /// Lowest level.
  | Trace = 0
  /// Higher than the trace level and lower than the info level.
  | Debug = 1
  /// Higher than the debug level and lower than the notice level.
  | Info = 2
  /// Higher than the info level and lower than the warn level.
  | Notice = 3
  /// Higher than the notice level and lower than the error level.
  | Warn = 4
  /// Higher than the warn level and lower than the fatal level.
  | Error = 5
  /// Highest level.
  | Fatal = 6

/// Immutable struct holding information relating to a log entry.
[<Struct>]
type LogEntry (level: LogLevel, time: DateTime, path: string, message: string) =

  static let separators = [| '\\'; '/' |]

  /// The log level of the message
  member _.Level = level

  /// The time at which the entry was logged
  member _.Time = time

  /// The source of the message
  member _.Path = path

  /// The actual log message
  member _.Message = message

  override _.ToString () = $"| {time} [{level}]\t{message}"

  /// Retrieves a string representation of the long message using some default formatting. This is a more compact representation than ToString()
  member _.ShortString =
    let sb = StringBuilder (path.Length)
    let idx = path.LastIndexOfAny (separators, path.Length - 1)
    let ts = DateTimeFormatInfo.CurrentInfo.LongTimePattern

    sb
      .Append('[')
      .Append(time.ToString (ts))
      .Append(']')
      .Append(path, idx + 1, max 0 (path.Length - 1 - idx))
      .Append(": ")
      .Append(message)
      .ToString ()

/// Immutable logger, which holds information about the logging context.
[<Struct>]
[<StructuredFormatDisplay("Logger: {path = path; consumer = consumer}")>]
type Logger internal (path: string, consumer: LogEntry -> unit) =

  /// The current path of this logger
  member _.Path = path

  /// The current consumer for this logger
  member _.Consumer = consumer

  /// Logs an unformatted message at the specified level
  member _.Log level message =
    let logEntry = LogEntry (level, DateTime.Now, path, message)
    consumer logEntry

  member this.Logf level format = Printf.ksprintf (this.Log level) format

  /// Logs the message at the trace level. This is the lowest log level.
  member this.trace msg = this.Log LogLevel.Trace msg

  /// Logs the message at the debug level. This is higher than trace and lower than info.
  member this.debug msg = this.Log LogLevel.Debug msg

  /// Logs the message at the info level. This is higher than debug and lower than notice.
  member this.info msg = this.Log LogLevel.Info msg

  /// Logs the message at the notice level. This is higher than info and lower than warn.
  member this.notice msg = this.Log LogLevel.Notice msg

  /// Logs the message at the warning level. This is higher than notice and lower than error.
  member this.warn msg = this.Log LogLevel.Warn msg

  /// Logs the message at the error level. This is higher than warn and lower than fatal.
  member this.error msg = this.Log LogLevel.Error msg

  /// Logs the message at the fatal level. This is the highest log level.
  member this.fatal msg = this.Log LogLevel.Fatal msg

  override _.ToString () = $"Logger: {{path = '{path}'; consumer = {consumer}}}"

module Logger =
  /// The default logger. Has no path and does nothing on consumption.
  let Default = Logger ("", ignore)
  let mutable Platform = Default

  /// A logger that prints to std::out / std::err based on the context
  let Console =
    let print (le: LogEntry) =
      match le.Level with
      | LogLevel.Debug
      | LogLevel.Info -> Console.WriteLine (string le)
      | _ -> Console.Error.WriteLine (string le)

    Logger ("", print)

  /// A logger that prints to std::out / std::err based on the context, using a short form
  let ConsoleShort =
    let print (le: LogEntry) =
      match le.Level with
      | LogLevel.Debug
      | LogLevel.Info -> System.Console.WriteLine (le)
      | _ -> System.Console.Error.WriteLine (le.ShortString)

    Logger ("", print)

  let private levelToCol l =
    match l with
    | LogLevel.Trace -> ConsoleColor.DarkGray
    | LogLevel.Debug -> ConsoleColor.Blue
    | LogLevel.Info -> ConsoleColor.Green
    | LogLevel.Notice -> ConsoleColor.Cyan
    | LogLevel.Warn -> ConsoleColor.Yellow
    | LogLevel.Error -> ConsoleColor.Red
    | _ -> ConsoleColor.Magenta

  /// A logger that prints to std::out / std::err based on the context, with extra colourization
  let ColorConsole =
    let print (le: LogEntry) =
      System.Console.ResetColor ()
      System.Console.ForegroundColor <- levelToCol le.Level

      match le.Level with
      | LogLevel.Debug
      | LogLevel.Info -> System.Console.WriteLine (le.ToString ())
      | _ -> System.Console.Error.WriteLine (le.ToString ())

      System.Console.ResetColor ()

    Logger ("", print)

  /// A logger that prints to std::out / std::err based on the context, with extra colourization, using a short form
  let ColorConsoleShort =
    let print (le: LogEntry) =
      System.Console.ResetColor ()
      System.Console.ForegroundColor <- levelToCol le.Level

      match le.Level with
      | LogLevel.Debug
      | LogLevel.Info -> System.Console.WriteLine (le.ShortString)
      | _ -> System.Console.Error.WriteLine (le.ShortString)

      System.Console.ResetColor ()

    Logger ("", print)

  /// Creates a new logger with the provided consumer
  let withConsumer newConsumer (logger: Logger) =
    Logger (logger.Path, newConsumer)

  /// Creates a new logger with the provided path
  /// This accepts a format string.
  let withPath format =
    Printf.ksprintf
      (fun path (logger: Logger) ->
        Logger (path.Replace ('\\', '/'), logger.Consumer))
      format

  /// Creates a new logger with the provided path appended. This is useful for hierarchical logger pathing.
  /// This accepts a format string.
  let appendPath format =
    Printf.ksprintf
      (fun path (logger: Logger) ->
        Logger (
          Path.Combine(logger.Path, path).Replace ('\\', '/'),
          logger.Consumer
        ))
      format

  /// Logs a message to the logger at the provided level.
  /// This accepts a format string.
  let logf level format =
    Printf.ksprintf (fun msg (logger: Logger) -> logger.Log level msg) format

  /// Adds a consumer to the logger, such that the new and current consumers are run.
  let addConsumer newConsumer (logger: Logger) =
    let curConsumer = logger.Consumer

    let consume l =
      curConsumer l
      newConsumer l

    logger |> withConsumer consume

  /// Removes all consumers from the logger.
  let removeConsumer (logger: Logger) =
    logger |> withConsumer Unchecked.defaultof<_>

  /// Creates a new logger with a mapping function over the log entries.
  let decorate f (logger: Logger) = Logger (logger.Path, f >> logger.Consumer)

  /// Creates a new logger that indents all messages in the logger by 4 spaces.
  let indent: Logger -> Logger =
    let indentF (l: LogEntry) =
      LogEntry (l.Level, l.Time, l.Path, $"    {l.Message}")

    decorate indentF

type StoreamLogger =
  static member inline public ID = $"Stoream: "

  static member inline public log = Logger.ColorConsole

  static member inline public Info (msg: string) =
    StoreamLogger.log.info $"{StoreamLogger.ID}{msg}"

  static member inline public Debug (msg: string) =
    StoreamLogger.log.debug $"{StoreamLogger.ID}{msg}"

  static member inline public Error (msg: string) =
    StoreamLogger.log.error $"{StoreamLogger.ID}{msg}"

  static member inline public Warn (msg: string) =
    StoreamLogger.log.warn $"{StoreamLogger.ID}{msg}"

  static member inline public Notice (msg: string) =
    StoreamLogger.log.notice $"{StoreamLogger.ID}{msg}"

  static member inline public Trace (msg: string) =
    StoreamLogger.log.trace $"{StoreamLogger.ID}{msg}"

  static member inline public Fatal (msg: string) =
    StoreamLogger.log.fatal $"{StoreamLogger.ID}{msg}"
