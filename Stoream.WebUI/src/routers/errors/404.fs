module App.Routers.Errors.NotFound

open Feliz
open Feliz.DaisyUI
open System

[<ReactComponent>]
let ErrorBody () =
  Html.div
    [ prop.children
        [ Html.p
            [ prop.className ""
              prop.text (
                sprintf
                  "'%A' is not a valid Stoream page!"
                  (String.Join ("/", Feliz.Router.Router.currentPath ()))
              ) ] ] ]

[<ReactComponent>]
let NavigateToHome () =
  Daisy.button.button
    [ button.animation
      button.sm

      prop.text "Home"
      prop.onClick (fun _ -> Feliz.Router.Router.navigatePath "/") ]

[<ReactComponent>]
let NavigateBack () =
  Daisy.button.button
    [ button.animation
      button.sm

      prop.text "Back"
      prop.onClick (fun _ -> Feliz.Router.Router.navigateBack ()) ]

[<ReactComponent>]
let NotFound () =
  Html.div
    [ prop.className "flex flex-row justify-center items-center h-screen"
      prop.children
        [ Daisy.card
            [ card.bordered
              prop.className "shadow-lg p-4"
              prop.children
                [ Daisy.cardBody
                    [ prop.className "space-y-4"
                      prop.children
                        [ Daisy.cardTitle
                            [ prop.children
                                [ Daisy.alert
                                    [ alert.error
                                      prop.text "Oops!!! Page Not Found!" ] ] ]

                          ErrorBody ()

                          Daisy.cardActions
                            [ prop.className "flex flex-row justify-between"
                              prop.children
                                [ NavigateToHome () ; NavigateBack () ] ] ] ] ] ] ] ]
