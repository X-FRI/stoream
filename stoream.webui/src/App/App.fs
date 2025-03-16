module Stoream.Webui.App

open Sutil

open Types
open State
open System
open Remote
open type Feliz.length
open Fable.Core.JsInterop

importSideEffects "../style.css"


let viewPage model dispatch page =
    match page with
    | Home -> Pages.Home.create ()
    | Login -> Pages.Login.create ()
    | TechAbout -> Pages.TechAbout.create ()

let view () =
    // Remote services
    let server = Server ()

    // model is an IStore<Model>
    // This means we can write to it if we want, but when we're adopting
    // Elmish, we treat it like an IObservable<Model>
    let model, dispatch = () |> Store.makeElmish init (update server) ignore

    // Projections from model. These will be bound to elements below
    let page : IObservable<Page> = model |> Store.map getPage |> Store.distinct

    // Local store to connect hamburger to nav menu. We *could* route this through Elmish
    let navMenuActive = Store.make false
    // Local store for spotting media change. Also, could go through Elmish
    let isMobile = Store.make false

    let showAside =
        Store.zip isMobile navMenuActive
        |> Store.map (fun (m, a) -> not m || a)

    // Listen to browser-sourced events
    let routerSubscription = Navigable.listenLocation (Router.parseRoute, dispatch << SetPage)

    let mediaSubscription = Media.listenMedia ("(max-width: 768px)", Store.set isMobile)

    Html.div [
        // Apply the navbar component if needed
        // We could add a simple navbar here

        // This subscribe tracks the current page and displays the appropriate view
        Bind.el (page, viewPage model dispatch)
    ]

// Start the app
view () |> Program.mount
