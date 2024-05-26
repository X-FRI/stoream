module Stoream.Engine.Storage.Services

open Suave
open Stoream.Engine.API
open Stoream.Engine.Config
open Stoream.Engine.Storage.API.Tree
open Stoream.Engine.Storage.API.Capacity

type Storage () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Storage

  (* Implementing the API interface indicates that this type is an API service *)
  interface API with
    static member public App = Storage.App

  static member public App = choose [ Tree.App; Capacity.App ]
