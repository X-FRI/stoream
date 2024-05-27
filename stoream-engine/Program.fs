(* The entry module of stoream-engine.
 * This module must always be at the bottom of the dependencies.
 *
 * NOTE: No module must depend on this module!!! *)

module Stoream.Engine.Program

open Server

[<EntryPoint>]
let main argv =
  Server.Start ()
  0
