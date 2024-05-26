module Stoream.Engine.Config

open System

[<Text.Json.Serialization.JsonFSharpConverterAttribute>]
type AccountConfig = { Username: String; Password: String }

[<Text.Json.Serialization.JsonFSharpConverterAttribute>]
type ServerConfig = { Hostname: String; Port: UInt16 }

[<Text.Json.Serialization.JsonFSharpConverterAttribute>]
type StorageConfig = { Root: String; Capacity: UInt32 }

[<Text.Json.Serialization.JsonFSharpConverterAttribute>]
type Config =
    { Account: AccountConfig
      Server: ServerConfig
      Storage: StorageConfig }

    static member public CONFIG =
        IO.File.ReadAllText("./stoream-engine.json")
        |> Text.Json.JsonSerializer.Deserialize<Config>
