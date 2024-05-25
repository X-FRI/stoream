module Stoream.Engine.Config

open System
open FSharp.Json

type AccountConfig = { Username: String; Password: String }
type ServerConfig = { Hostname: String; Port: UInt16 }
type StorageConfig = { Root: String; Capacity: UInt32 }

type Config =
    { Account: AccountConfig
      Server: ServerConfig
      Storage: StorageConfig }

    static member public CONFIG =
        IO.File.ReadAllText("./stoream-engine.json") |> Json.deserialize<Config>
