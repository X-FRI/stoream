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

  static member public App =
    choose [ path "/tree" >=> GET >=> request Tree.Tree ]

  static member private Tree (request: HttpRequest) =
    IO.DirectoryInfo (Tree.CONFIG.Root)
    |> Tree.BuildDirectoryStructure
    |> Text.Json.JsonSerializer.Serialize
    |> OK

  (* Traverse the directory tree under the specified directory *)
  static member private BuildDirectoryStructure (dir: IO.DirectoryInfo) =
    let mutable dirSize = 0UL

    { Name = dir.Name
      Path = dir.FullName
      Files =
        dir.GetFiles ()
        |> Array.map(fun fileInfo ->
          let fileSize = fileInfo.Length |> uint64
          dirSize <- dirSize + fileSize

          { Name = fileInfo.Name
            Path = fileInfo.FullName
            Size = fileSize })
      Sub = dir.GetDirectories () |> Array.map Tree.BuildDirectoryStructure
      Size = dirSize }
