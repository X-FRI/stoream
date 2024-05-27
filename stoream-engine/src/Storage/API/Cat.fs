(* Cat is similar to the cat command under Unix and is used to return all the contents of the file.
 * This API is especially suitable for small files. *)
module Stoream.Engine.Storage.API.Cat

open System
open Suave
open Suave.Filters
open Suave.Operators
open Suave.Writers
open Stoream.Engine.API
open Stoream.Engine.Config

type Cat () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Storage

  (* Implementing the API interface indicates that this type is an API service *)
  interface API with
    static member public App = Cat.App

  static member public App = path "/cat" >=> GET >=> request Cat.Cat

  static member private Cat (request: HttpRequest) =
    let path = request.queryParamOpt("path").Value |> snd |> _.Value

    setHeader
      "Content-Disposition"
      $"inline; filename={IO.FileInfo(path).FullName}"
    >=> Files.sendFile path true
