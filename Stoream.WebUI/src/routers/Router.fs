module App.Routers.Router

open Elmish
open Feliz
open Feliz.Router
open App.Types.Router

let InitializeRouter () = { CurrentUrl = Router.currentUrl () }

let UpdateRouter (UrlChanged segments) state =
  { state with CurrentUrl = segments }

let Router () =
  Program.mkSimple InitializeRouter UpdateRouter (fun state dispatch ->
    React.router
      [ router.pathMode
        router.onUrlChanged (UrlChanged >> dispatch)
        router.children
          [ match state.CurrentUrl with
            | [] -> Login.Components.Login ()
            | _ -> Errors.NotFound.NotFound () ] ])
