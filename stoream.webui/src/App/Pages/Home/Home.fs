module Home

open Sutil
open Sutil.Bulma
open System

let create (message : IObservable<string>) =
    bulma.section [
        Html.h2 [ Attr.className "title is-2"; Html.text "Home" ]
        Html.article [
            Attr.className "message is-info"
            Html.div [
                Attr.className "message-body"
                Bind.el(message,Html.text)
            ]
        ]
    ]
