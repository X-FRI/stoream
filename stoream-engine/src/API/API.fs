module Stoream.Engine.API

open Suave

(* Declaring "interfaces with static abstract methods" is an advanced feature.
 * See https://aka.ms/fsharp-iwsams for guidance. *)
#nowarn "3535"

(* When adding a new service implementation, please implement this interface *)
[<Interface>]
type API =
  static abstract App: WebPart
