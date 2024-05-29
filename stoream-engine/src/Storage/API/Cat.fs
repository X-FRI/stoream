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

module Stoream.Engine.Storage.API.Cat

open System
open Suave
open Suave.Filters
open Suave.Operators
open Suave.Writers
open Stoream.Engine.API.Constraint
open Stoream.Engine.Config
open Stoream.Engine.Storage.Secure
open Stoream.Engine.Logger.StoreamLogger

(* Cat is similar to the cat command under Unix and is used to return all the contents of the file.
 * This API is especially suitable for small files. *)
type Cat () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Storage

  (* Implementing the API interface indicates that this type is an API service *)
  interface IGetAPI with
    static member public App = Cat.App

  static member public App =
    path "/cat" >=> GET >=> request Cat.Cat

  static member private Cat (request: HttpRequest) =
    StoreamLogger.Info $"request {Cat}"
    request.queryParamOpt("path").Value
    |> snd
    |> _.Value
    |> Secure.PathOperation (fun path ->
      setHeader
        "Content-Disposition"
        $"inline; filename={IO.FileInfo(path).FullName}"
      >=> Files.sendFile path true)
