namespace App

open Feliz
open Feliz.Router
open Feliz.DaisyUI

type Components =
  /// <summary>
  /// The simplest possible React component.
  /// Shows a header with the text Hello World
  /// </summary>
  [<ReactComponent>]
  static member HelloWorld () = Html.h1 "Hello World"

  /// <summary>
  /// A stateful React component that maintains a counter
  /// </summary>
  [<ReactComponent>]
  static member Counter () =
    let count, setCount = React.useState 0

    Html.div
      [ prop.className "flex flex-row justify-center items-center h-screen"
        prop.children
          [ Daisy.card
              [ prop.className "shadow-lg p-4 rounded-md m-4 flex flex-col justify-center items-center"
                prop.children
                  [ Daisy.cardTitle [ prop.text count ]
                    Daisy.cardBody [ prop.text "计数器" ]
                    Daisy.cardActions
                      [ Daisy.button.button
                          [ theme.cupcake
                            button.primary
                            prop.text "增加"
                            prop.onClick (fun _ -> setCount (count + 1)) ] ] ] ] ] ]

  /// <summary>
  /// A React component that uses Feliz.Router
  /// to determine what to show based on the current URL
  /// </summary>
  [<ReactComponent>]
  static member Router () =
    let currentUrl, updateUrl = React.useState (Router.currentUrl ())

    React.router
      [ router.onUrlChanged updateUrl
        router.children
          [ match currentUrl with
            | [] -> Html.h1 "Index"
            | [ "hello" ] -> Components.HelloWorld ()
            | [ "counter" ] -> Components.Counter ()
            | _ -> Html.h1 "Not found" ] ]
