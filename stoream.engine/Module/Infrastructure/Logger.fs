module stoream.engine.Module.Infrastructure.Logger

open Microsoft.Extensions.Logging
open TinyLogger

let LoggingBuilder =
    fun (builder : ILoggingBuilder) ->
        builder.AddTinyLogger (fun options ->
            options.AddTrueColorConsole () |> ignore
            options.Template <- MessageTemplates.MinimalTimestamped)
        |> ignore

let private loggerFactory = LoggerFactory.Create LoggingBuilder

let Logger = loggerFactory.CreateLogger ("Stoream")
