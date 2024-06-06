module Stoream.WebSite.Main

open Browser.Dom
open Feliz

[<ReactComponent>]
let Title () =
  Html.section
    [ prop.className "container is-primary"
      prop.children
        [ Html.div
            [ prop.className "hero-body"
              prop.children
                [ Html.div
                    [ prop.className "content"
                      prop.children
                        [ Html.h1
                            [ prop.className "title block"
                              prop.text "Stoream" ]

                          Html.p "Minimalist self-hosted network disk system" ] ] ] ] ] ]

[<ReactComponent>]
let App () =
  Html.div
    [ prop.className "fixed-grid has-1-cols mt-6 ml-6"
      prop.children
        [ Html.div [ prop.className "grid"; prop.children [ Title () ] ] ] ]

ReactDOM.createRoot(document.getElementById "root").render(App ())
