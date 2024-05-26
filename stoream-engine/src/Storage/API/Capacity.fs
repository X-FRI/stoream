(* Capacity returns the ratio of the size of Stoream.Engine.Config.CONFIG.Storage.Root
 * to Stoream.Engine.Config.CONFIG.Storage.Capacity. *)
module Stoream.Engine.Storage.API.Capacity

open System
open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Stoream.Engine.API
open Stoream.Engine.Config
open Stoream.Engine.Storage.API.Tree

type Capacity () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Storage

  (* Implementing the API interface indicates that this type is an API service *)
  interface API with
    static member public App = Capacity.App

  static member public App =
    path "/capacity" >=> GET >=> request Capacity.Capacity

  static member public Capacity (request: HttpRequest) =
    Tree.PublicTreeMethod ()
    |> fun dir ->
      (double dir.Size) / 1000_000. / (Capacity.CONFIG.Capacity |> double)
    |> fun size -> {| Capacity = size |}
    |> Text.Json.JsonSerializer.Serialize
    |> OK
