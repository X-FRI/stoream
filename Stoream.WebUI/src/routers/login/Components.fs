module App.Routers.Login.Components

open Feliz
open Feliz.DaisyUI

[<ReactComponent>]
let LoginForm () =
  Html.div
    [ prop.children
        [ Daisy.formControl
            [ Daisy.label [ Daisy.labelText "Username" ]
              Daisy.input
                [ input.xs
                  input.bordered
                  prop.placeholder "Username" ] ]

          Daisy.formControl
            [ Daisy.label [ Daisy.labelText "Password" ]
              Daisy.input
                [ prop.type'.password
                  input.bordered
                  input.xs
                  prop.placeholder "Password" ] ] ] ]

[<ReactComponent>]
let Login () =

  Html.div
    [ prop.className "flex flex-row justify-center items-center h-screen"
      prop.children
        [ Daisy.card
            [ card.bordered
              prop.className "shadow-lg p-4"
              prop.children
                [ Daisy.cardTitle "Login to Stoream"
                  Daisy.cardBody [ prop.children [ LoginForm () ] ]
                  Daisy.cardActions
                    [ Daisy.button.button
                        [ button.neutral
                          button.block
                          button.sm
                          prop.text "Login" ] ] ] ] ] ]
