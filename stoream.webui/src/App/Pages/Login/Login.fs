module Stoream.Webui.Pages.Login

open System.Net.Http
open Engine.Types
open Sutil
open Engine

let UserLogin () =
    let client = EngineClient "http://localhost:5000/"
    async {
        try
            let! response = client.PostAuthLogin { username = Some "hell"; password = Some "123456" }
            printfn $"{response}"
        with :? HttpRequestException as e ->
            printfn $"({e.StatusCode}): {e.Message}"
    }
    |> Async.Start

let create () =
    // login container
    Html.div [
        Attr.className "flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6"

        // login form card
        Html.div [
            Attr.className
                "w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            // card header
            Html.div [
                Attr.className "p-6 border-b border-gray-200 dark:border-gray-700"
                Html.h1 [
                    Attr.className "text-2xl font-semibold text-gray-900 dark:text-gray-100"
                    Attr.text "Login to stoream"
                ]
            ]

            // card content
            Html.div [
                Attr.className "p-6 space-y-4"
                // login form
                Html.form [
                    Attr.className "space-y-4"
                    // username
                    Html.input [
                        Attr.className
                            "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        Attr.type' "text"
                        Attr.placeholder "Username"
                        Attr.required true
                    ]

                    // password
                    Html.input [
                        Attr.className
                            "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        Attr.type' "password"
                        Attr.placeholder "Password"
                        Attr.required true
                    ]
                ]
            ]

            // card footer
            Html.div [
                Attr.className "p-6 border-t border-gray-200 dark:border-gray-700 space-y-4"

                // login button
                Html.button [
                    Attr.className
                        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors duration-200 cursor-pointer"
                    Attr.type' "submit"
                    Attr.text "Login"
                    Ev.onClick (fun _ -> UserLogin ())
                ]

                // Tip: If you don't have an account, click here to register.
                Html.p [
                    Attr.className "text-sm text-center text-gray-600 dark:text-gray-400"
                    Html.text "If you don't have an account, "
                    Html.a [
                        Attr.className
                            "font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                        Attr.href "#"
                        Attr.text "click here to register"
                    ]
                    Html.text "."
                ]
            ]
        ]
    ]
