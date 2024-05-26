(* The configuration file of stoream-engine will be deserialized into the record
 * type defined under this module. 
 * 
 * NOTE: stoream-engine does not allow users to customize the path of the 
 * configuration file. Please check stoream-engine.json in the project root directory. *)
module Stoream.Engine.Config

open System

[<Text.Json.Serialization.JsonFSharpConverter>]
type AccountConfig = { Username: String; Password: String }

[<Text.Json.Serialization.JsonFSharpConverter>]
type ServerConfig =
  { Hostname: String
    Port: UInt16
    WebUI: String }

[<Text.Json.Serialization.JsonFSharpConverter>]
type StorageConfig = { Root: String; Capacity: UInt32 }

[<Text.Json.Serialization.JsonFSharpConverter>]
type Config =
  { Account: AccountConfig
    Server: ServerConfig
    Storage: StorageConfig }

  static member public CONFIG =
    IO.File.ReadAllText "./stoream-engine.json"
    |> Text.Json.JsonSerializer.Deserialize<Config>
