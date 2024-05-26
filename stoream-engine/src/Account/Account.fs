(* This module provides stoream-engine user system API services,
 * such as user login verification, etc.*)
module Stoream.Engine.Account

open System.Text.Json
open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Config
open API

type Account () =
  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member public CONFIG = Config.CONFIG.Account

  (* Implementing the API interface indicates that this type is an API service *)
  interface API with
    static member public App = Account.App

  static member private Login (request: HttpRequest) =
    let username = request.queryParamOpt("username").Value |> snd |> _.Value
    let password = request.queryParamOpt("password").Value |> snd |> _.Value

    (username = Account.CONFIG.Username && password = Account.CONFIG.Password)
    |> fun correct -> {| status = if correct then "OK" else "ERROR" |}
    |> JsonSerializer.Serialize
    |> OK

  static member public App: WebPart =
    path "/login" >=> choose [ GET >=> request Account.Login ]
