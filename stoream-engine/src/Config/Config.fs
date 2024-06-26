(* Copyright (c) 2024 The X-Files Research Institute
 * 
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of Stoream nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *)

module Stoream.Engine.Config

open System
open FSharp.Data

(* Use FSharp.Data's JsonProvider to generate the Config type,
 * ensuring .NET Native AOT compatibility 
 * 
 * The configuration file of stoream-engine will be deserialized into the record
 * type defined under this module. 
 * 
 * NOTE: stoream-engine does not allow users to customize the path of the 
 * configuration file. Please check stoream-engine.json in the project root directory. *)
type Config =
  JsonProvider<"""
{
    "PIN": "294538",
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
""">

let CONFIG =
  [ "./stoream-engine/stoream-engine.json"; "./stoream-engine.json" ]
  |> List.find IO.File.Exists
  |> IO.File.ReadAllText
  |> Config.Parse
