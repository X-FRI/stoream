module App

open App
open Elmish
open Elmish.React
open Feliz
open Feliz.Router

type State = { CurrentUrl : string list }
type Msg = UrlChanged of string list

let init () = { CurrentUrl = Router.currentUrl () }
let update (UrlChanged segments) state = { state with CurrentUrl = segments }

let render state dispatch =
  React.router
    [ router.onUrlChanged (UrlChanged >> dispatch)
      router.children
        [ do printfn "routing to url %A" state.CurrentUrl
          match state.CurrentUrl with
          | [] -> Routers.Login.Components.Login ()
          // | [ "user"; Route.Int userId ] -> Html.h1 (sprintf "User ID %d" userId)
          | _ -> Html.h1 "Not found" ] ]

Program.mkSimple init update render
|> Program.withReactSynchronous "root"
|> Program.run
