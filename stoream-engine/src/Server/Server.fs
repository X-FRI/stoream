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

module Stoream.Engine.Server

open System
open Suave
open Suave.Writers
open Suave.Filters
open Suave.Operators
open Config
open Account
open Stoream.Engine.Storage

(* API server for stoream-engine, currently implemented using Suave 
 * SEE: https://suave.io *)
type Server () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Server

  (* Cross-domain related configurations.
   * SEE: [CORS response with Suave](https://www.fssnip.net/mL/title/CORS-response-with-Suave) *)
  static member private CORS =
    addHeader "Access-Control-Allow-Origin" Server.CONFIG.WebUi
    >=> setHeader "Access-Control-Allow-Headers" "token"
    >=> addHeader "Access-Control-Allow-Headers" "Content-Type"
    >=> addHeader "Access-Control-Allow-Methods" "GET,POST,OPTIONS"

  (* All API services are defined here,
   * and this member will be passed as a parameter to Suave.startWebServerAsync. *)
  static member private Apps: WebPart =
    choose
      [ GET
        >=> fun context ->
          context
          |> (Server.CORS
              >=> choose
                [
                  (* Please add new services here. *)
                  Account.App
                  Tree.Tree.App
                  Cat.Cat.App
                  Capacity.Capacity.App
                  CreateDirectory.CreateDirectory.App ])
        POST
        >=> fun context ->
          context
          |> (Server.CORS
              >=> choose
                [
                  (* Please add new services here. *)
                  Upload.Upload.App ]) ]

  (* Start the asynchronous server according to the configuration.
   * NOTE: This function will read the keyboard input from the console.
   *       Pressing any key will exit the server program. *)
  static member public Start () =
    let cts = new Threading.CancellationTokenSource ()

    let conf =
      { defaultConfig with
          cancellationToken = cts.Token
          bindings =
            [ (HttpBinding.create
                HTTP
                (Server.CONFIG.Hostname |> Net.IPAddress.Parse)
                (Server.CONFIG.Port |> uint16)) ] }

    let _, server = startWebServerAsync conf Server.Apps

    Async.Start (server, cts.Token)
    Console.ReadKey true |> ignore

    cts.Cancel ()
