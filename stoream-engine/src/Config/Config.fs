(* The configuration file of stoream-engine will be deserialized into the record
 * type defined under this module. 
 * 
 * NOTE: stoream-engine does not allow users to customize the path of the 
 * configuration file. Please check stoream-engine.json in the project root directory. *)
module Stoream.Engine.Config

open System
open FSharp.Data

(* Use FSharp.Data's JsonProvider to generate the Config type,
 * ensuring .NET Native AOT compatibility *)
type Config =
  JsonProvider<Sample="""
{
    "Account": {
        "Username": "admin",
        "Password": "admin"
    },
    "Server": {
        "Hostname": "127.0.0.1",
        "Port": 9993,
        "WebUI": "http://localhost:5173"
    },
    "Storage": {
        "Root": "/home/muqiu/Documents/Note",
        "Capacity": 100
    }
}
""", InferenceMode=InferenceMode.ValuesAndInlineSchemasOverrides>

let CONFIG = Config.Parse (IO.File.ReadAllText "./stoream-engine.json")
