module State

open Types
open Sutil
open System
open Remote

open Browser.Dom

type Message =
    | SetPage of Page
    | SetPageGreeting of Page*string
    | SetUser of LoggedInUser option
    | LogUserIn of Login.LoginDetails
    | LogUserOut
    | SetException of Exception
    //| SetMessage of string

let init () : Model * Cmd<Message> = {
    User = None; Page = Home; ErrorMessage = ""; Greeting = "" }, Cmd.ofMsg (SetUser None)

let update (server:Server) (msg : Message) (model : Model) : Model * Cmd<Message> =
    //Browser.Dom.console.log($"{msg}")
    match msg with

    |SetException x ->
        { model with ErrorMessage = x.Message }, Cmd.none

    //|SetMessage m ->
    //    { model with Message = m }, Cmd.none

    |SetPage p ->
        window.location.href <- "#" + (string p).ToLower()
        { model with Page = p; ErrorMessage = "" }, Cmd.none

    |SetPageGreeting (p,msg) ->
        { model with Page = p; Greeting = msg }, Cmd.none

    |SetUser u ->
        let greeting =
            match u with
            | Some u -> "Welcome back, " + u.Name
            | None -> "You are logged in as a guest user. Login in to see your account details."
        { model with User = u },
            (Home, greeting) |> SetPageGreeting |> Cmd.ofMsg

    |LogUserIn details ->
        let success authToken =
            { AuthToken = authToken; Name = details.Username } |> Some |> SetUser
        model, Cmd.OfAsync.either server.AuthorizeUser (details.Username,details.Password) success SetException

    |LogUserOut ->
        model, Cmd.ofMsg (SetUser None)
