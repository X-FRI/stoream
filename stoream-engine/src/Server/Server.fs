(* API server for stoream-engine, currently implemented using Suave 
 * SEE: https://suave.io *)

module Stoream.Engine.Server

open System
open Suave
open Suave.Writers
open Suave.Filters
open Suave.Operators
open Config
open Account

type Server () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member public CONFIG = CONFIG.Server

  (* Cross-domain related configurations.
   * SEE: [CORS response with Suave](https://www.fssnip.net/mL/title/CORS-response-with-Suave) *)
  static member private CORS =
    addHeader "Access-Control-Allow-Origin" Server.CONFIG.WebUi
    >=> setHeader "Access-Control-Allow-Headers" "token"
    >=> addHeader "Access-Control-Allow-Headers" "Content-Type"
    >=> addHeader "Access-Control-Allow-Methods" "GET"

  (* All API services are defined here,
   * and this member will be passed as a parameter to Suave.startWebServerAsync. *)
  static member private Apps: WebPart =
    GET
    >=> fun context ->
      context
      |> (Server.CORS
          >=> choose
            [
              (* Please add new services here. *)
              Account.App ])

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
