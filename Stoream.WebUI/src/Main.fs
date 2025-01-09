module App

open App.Routers
open Elmish
open Elmish.React

Router.Router () |> Program.withReactSynchronous "root" |> Program.run
