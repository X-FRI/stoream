module App

open Sutil
open Sutil.Styling
open Sutil.CoreElements

open Types
open State
open System
open Remote
open type Feliz.length
open Feliz
open Sutil.Transition
open Fable.Core.JsInterop

importSideEffects "../style.css"

let viewPage model dispatch page =
    let errorMessage = (model |> Store.map getErrorMessage)
    let greeting = (model |> Store.map getGreeting)
    match page with
    | Home ->
        Home.create greeting
    | Users ->
        Users.create()
    | Login ->
        Login.create Login.LoginDetails.Default errorMessage (dispatch << LogUserIn) (fun _ -> Home |> SetPage |> dispatch)

let userIsSet (user : LoggedInUser option) = user.IsSome

// In Sutil, the view() function is called *once*
let view() =

    // Remote services
    let server = Server()

    // model is an IStore<ModeL>
    // This means we can write to it if we want, but when we're adopting
    // Elmish, we treat it like an IObservable<Model>
    let model, dispatch = () |> Store.makeElmish init (update server) ignore

    // Projections from model. These will be bound to elements below
    let page : IObservable<Page> = model |> Store.map getPage |> Store.distinct
    let isLoggedIn : IObservable<bool> = model |> Store.map (getUser >> userIsSet)

    // Local store to connect hamburger to nav menu. We *could* route this through Elmish
    let navMenuActive = Store.make false
    // Local store for spotting media change. Also, could go through Elmish
    let isMobile = Store.make false
    let showAside = Store.zip isMobile navMenuActive |> Store.map (fun (m,a) -> not m || a)

    // Listen to browser-sourced events
    let routerSubscription  = Navigable.listenLocation(Router.parseRoute, dispatch << SetPage)
    let mediaSubscription = Media.listenMedia("(max-width: 768px)",Store.set isMobile)

    fragment [
        Html.nav [
            Attr.className ""

            Attr.roleNavigation

            Html.div [
                Attr.className "navbar-brand"

                // Temporary logo
                Html.h1 [
                    Attr.className "title is-4 sutil-logo"
                    Html.a [
                        Attr.className "navbar-item"
                        Attr.href "https://github.com/davedawkins/Sutil"
                        Html.div [ Attr.className "sutil-logo-badge"; Html.span [ text "<>" ] ]
                        Html.span [ style [ Css.marginLeft (px 6) ]; text "SUTIL" ]
                    ]
                ]
                Html.a [
                    Attr.roleButton
                    Attr.className "navbar-burger"
                    Bind.toggleClass(navMenuActive,"is-active")
                    Attr.ariaLabel "menu"
                    Attr.ariaExpanded false
                    Attr.custom("data-target","appNavMenu")
                    Html.span [ Attr.ariaHidden true ]
                    Html.span [ Attr.ariaHidden true ]
                    Html.span [ Attr.ariaHidden true ]
                    onClick (fun _ -> navMenuActive |> Store.modify not) [ PreventDefault ]
                ]
            ]


            Html.div [
                Attr.className "navbar-menu"
                id' "appNavMenu"

                Bind.toggleClass(navMenuActive,"is-active")

                Html.div [
                    Attr.className "navbar-end"
                    Html.div [
                        Attr.className "navbar-item"
                        Html.div [
                            Attr.className "buttons"
                            Bind.fragment isLoggedIn <| fun loggedIn ->
                                Html.a [
                                    Attr.className "button is-light"
                                    if (loggedIn) then
                                        fragment [
                                            text "Logout"
                                            onClick (fun _ -> dispatch LogUserOut) [ PreventDefault ]
                                        ]
                                    else
                                        fragment [
                                            text "Login"
                                            onClick (fun _ -> dispatch (SetPage Login)) [ PreventDefault ]
                                        ]
                                ]
                        ]
                    ]
                ]
            ]
        ]

        Html.div [
            Attr.className "columns"
            disposeOnUnmount [ model ]
            unsubscribeOnUnmount [ routerSubscription; mediaSubscription ]

            Html.aside [
                Attr.className "column is-2 aside hero is-fullheight"
                Html.div [
                    Attr.className "main"
                    Html.a [ Attr.className "item"; Attr.href "#home"; text "Home" ]
                    Html.a [ Attr.className "item"; Attr.href "#users"; text "Users" ]
                ]
            ] |> transition [fly |> withProps [ Duration 500.0; X -500.0 ] |> In] showAside

            Html.div [
                Attr.className "column is-10"
                Bind.fragment page <| viewPage model dispatch
            ]
        ]
    ]

// Start the app
view() |> Program.mount


