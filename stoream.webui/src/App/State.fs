module Stoream.Webui.State

open Types
open Sutil
open Remote

open Browser.Dom

type Message = SetPage of Page

let init () : Model * Cmd<Message> = { Page = Home }, Cmd.none

let update (server : Server) (msg : Message) (model : Model) : Model * Cmd<Message> =
    //Browser.Dom.console.log($"{msg}")
    match msg with
    | SetPage p ->
        window.location.href <- "#" + (string p).ToLower ()
        { model with Page = p }, Cmd.none
