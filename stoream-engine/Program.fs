module Stoream.Engine.Program

open Config
open System
open Server

[<EntryPoint>]
let main argv =
    Server.Start()

    0 // return an integer exit code
