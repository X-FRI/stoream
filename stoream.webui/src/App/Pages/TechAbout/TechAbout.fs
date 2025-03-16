module Stoream.Webui.Pages.TechAbout

open Sutil

// Create the full landing page
let create () =
    Html.div [
        Attr.className "min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-50"

        // Hero section
        Html.div [
            Attr.className "container mx-auto px-6 py-24 flex flex-col items-center"

            Html.h1 [
                Attr.className "text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight animate-fade-in"
                Html.text "Vite + TailwindCSS + Fable + Sutil"
            ]

            Html.p [
                Attr.className "text-xl text-zinc-300 text-center max-w-2xl mb-16 animate-fade-in-delay"
                Html.text "A lightning-fast development experience with the power of F# and modern web technologies"
            ]

            Html.div [
                Attr.className "flex flex-wrap justify-center gap-10 mb-20 animate-fade-in-delay-2"

                // Sutil logo
                Html.div [
                    Attr.className "flex flex-col items-center transition-transform duration-300 hover:scale-110"
                    Html.img [ Attr.src "/assests/sutil-logo.png"; Attr.className "h-16 mb-3"; Attr.alt "Sutil" ]
                ]

                // Vite logo
                Html.div [
                    Attr.className "flex flex-col items-center transition-transform duration-300 hover:scale-110"
                    Html.img [ Attr.src "/assests/vitejs-logo.svg"; Attr.className "w-16 h-16 mb-3"; Attr.alt "Vite.js" ]
                ]

                // TailwindCSS logo
                Html.div [
                    Attr.className "flex flex-col items-center transition-transform duration-300 hover:scale-110"
                    Html.img [
                        Attr.src "/assests/tailwindcss-logo.svg"
                        Attr.className "w-16 h-16 mb-3"
                        Attr.alt "TailwindCSS"
                    ]
                ]

                // Fable logo
                Html.div [
                    Attr.className "flex flex-col items-center transition-transform duration-300 hover:scale-110"
                    Html.img [ Attr.src "/assests/fable-logo.png"; Attr.className "h-16 mb-3"; Attr.alt "Fable" ]
                ]
            ]

            Html.a [
                Attr.href "#features"
                Attr.className
                    "px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-md shadow-lg shadow-emerald-900/20 transition-all duration-300 font-medium animate-bounce-subtle"
                Html.text "Explore Features"
            ]
        ]

        // Features section
        Html.div [
            Attr.id "features"
            Attr.className "container mx-auto px-6 py-8"

            Html.h2 [
                Attr.className "text-4xl font-bold text-center mb-16 tracking-tight"
                Html.text "Why Choose This Stack?"
            ]

            Html.div [
                Attr.className "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

                // Feature card 1
                Html.div [
                    Attr.className
                        "bg-zinc-800/50 border border-zinc-700 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:border-emerald-800/50 transition-all duration-300"
                    Html.div [ Attr.className "text-emerald-400 text-3xl mb-4 animate-pulse-slow"; Html.text "⚡" ]
                    Html.h3 [ Attr.className "text-xl font-bold mb-3"; Html.text "Lightning Fast HMR" ]
                    Html.p [
                        Attr.className "text-zinc-300"
                        Html.text "Vite provides an extremely fast development environment with instant hot module replacement."
                    ]
                ]

                // Feature card 2
                Html.div [
                    Attr.className
                        "bg-zinc-800/50 border border-zinc-700 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:border-emerald-800/50 transition-all duration-300"
                    Html.div [ Attr.className "text-emerald-400 text-3xl mb-4 animate-pulse-slow"; Html.text "🎨" ]
                    Html.h3 [ Attr.className "text-xl font-bold mb-3"; Html.text "Utility-First CSS" ]
                    Html.p [
                        Attr.className "text-zinc-300"
                        Html.text "TailwindCSS makes it easy to build modern designs without leaving your HTML (or F#)."
                    ]
                ]

                // Feature card 3
                Html.div [
                    Attr.className
                        "bg-zinc-800/50 border border-zinc-700 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:border-emerald-800/50 transition-all duration-300"
                    Html.div [ Attr.className "text-emerald-400 text-3xl mb-4 animate-pulse-slow"; Html.text "🚀" ]
                    Html.h3 [ Attr.className "text-xl font-bold mb-3"; Html.text "F# to JavaScript" ]
                    Html.p [
                        Attr.className "text-zinc-300"
                        Html.text "Fable compiles your F# code to clean, readable JavaScript that works everywhere."
                    ]
                ]

                // Feature card 4
                Html.div [
                    Attr.className
                        "bg-zinc-800/50 border border-zinc-700 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:border-emerald-800/50 transition-all duration-300"
                    Html.div [ Attr.className "text-emerald-400 text-3xl mb-4 animate-pulse-slow"; Html.text "🔄" ]
                    Html.h3 [ Attr.className "text-xl font-bold mb-3"; Html.text "Reactive UI" ]
                    Html.p [
                        Attr.className "text-zinc-300"
                        Html.text "Sutil provides a reactive programming model that makes UI state management simple and intuitive."
                    ]
                ]
            ]
        ]

        // Getting Started section
        Html.div [
            Attr.className "container mx-auto px-6 py-24 bg-zinc-900/50"

            Html.h2 [
                Attr.className "text-4xl font-bold text-center mb-16 tracking-tight"
                Html.text "Getting Started"
            ]

            Html.div [
                Attr.className
                    "bg-zinc-800/30 border border-zinc-700 p-8 rounded-xl shadow-xl max-w-3xl mx-auto transform hover:translate-y-[-5px] transition-all duration-300"

                Html.p [
                    Attr.className "text-zinc-200 mb-6 text-lg"
                    Html.text "Clone this repository and install dependencies:"
                ]

                Html.pre [
                    Attr.className "bg-zinc-900 p-5 rounded-lg text-zinc-300 overflow-x-auto border border-zinc-800"
                    Html.code [
                        Html.text
                            "git clone https://github.com/muqiuhan/fable-sutil-tailwind-vite-template\ncd fable-sutil-tailwind-vite-template\ndotnet tool restore\nbun install"
                    ]
                ]

                Html.p [ Attr.className "text-zinc-200 mt-8 mb-6 text-lg"; Html.text "Start the development server:" ]

                Html.pre [
                    Attr.className "bg-zinc-900 p-5 rounded-lg text-zinc-300 overflow-x-auto border border-zinc-800"
                    Html.code [ Html.text "bun run dev" ]
                ]

                Html.div [
                    Attr.className "mt-10 text-center"
                    Html.a [
                        Attr.href "https://github.com/muqiuhan/fable-sutil-tailwind-vite-template"
                        Attr.className
                            "px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-md shadow-lg border border-zinc-600 transition-all duration-300 font-medium inline-flex items-center group"
                        Html.span [ Attr.className "mr-3 group-hover:animate-bounce-subtle"; Html.text "📦" ]
                        Html.text "View on GitHub"
                    ]
                ]
            ]
        ]

        // Footer
        Html.footer [
            Attr.className "container mx-auto px-6 py-10 mt-16 border-t border-zinc-800"

            Html.div [
                Attr.className "text-center text-zinc-400"
                Html.p [
                    Html.text "Built with "
                    Html.span [ Attr.className "text-emerald-400 animate-pulse-slow"; Html.text "♥" ]
                    Html.text " using F# and Sutil"
                ]
            ]
        ]
    ]
