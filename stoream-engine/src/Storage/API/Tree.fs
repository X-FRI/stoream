(* Tree API is used to return a Stoream.Engine.Storage.Model.Directory 
 * mapping of Stoream.Engine.Config.CONFIG.Storage.Root *)
module Stoream.Engine.Storage.API.Tree

open System
open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Stoream.Engine.API
open Stoream.Engine.Config
open Stoream.Engine.Storage.Model.File
open Stoream.Engine.Storage.Model.Directory

type Tree () =

  (* Get the configuration file loaded at startup by the Stoream.Engine.Config module.
   * SEE: Stoream.Engine.Config *)
  static member inline public CONFIG = CONFIG.Storage

  (* Implementing the API interface indicates that this type is an API service *)
  interface API with
    static member public App = Tree.App

  static member public App = path "/tree" >=> GET >=> request Tree.Tree

  static member public Tree (request: HttpRequest) =
    (* Tree may be a very memory-intensive operation, so GC is called here for recycling. *)
    GC.Collect()
    IO.DirectoryInfo (Tree.CONFIG.Root)
    |> Tree.BuildDirectoryStructure
    |> Text.Json.JsonSerializer.Serialize
    |> OK

  (* Traverse the directory tree under the specified directory *)
  static member public BuildDirectoryStructure (dir: IO.DirectoryInfo) =
    let subDirectories =
      dir.GetDirectories () |> Array.map Tree.BuildDirectoryStructure

    let files =
      dir.GetFiles ()
      |> Array.map(fun file ->
        { Name = file.Name
          Path = file.FullName
          Size = file.Length })

    let size = files |> Array.sumBy(fun f -> int64 f.Size) |> uint64

    { Name = dir.Name
      Size = size + (subDirectories |> Array.sumBy(fun d -> d.Size))
      Sub = subDirectories
      Path = dir.FullName
      Files = files }
