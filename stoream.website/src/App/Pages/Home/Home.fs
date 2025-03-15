module Home

open Sutil
open Sutil.CoreElements

// Create a Hero section for the landing page
let heroSection () =
    Html.section [
        Attr.classes [
            "relative"
            "min-h-screen"
            "flex"
            "items-center"
            "justify-center"
            "py-24"
            "bg-black"
            "text-white"
            "overflow-hidden"
        ]

        // Background decoration elements
        Html.div [
            Attr.classes [
                "absolute"
                "w-96"
                "h-96"
                "bg-gray-800"
                "rounded-full"
                "mix-blend-multiply"
                "filter"
                "blur-3xl"
                "opacity-20"
                "-top-20"
                "-left-20"
                "animate-blob"
                "animation-delay-2000"
            ]
        ]
        Html.div [
            Attr.classes [
                "absolute"
                "w-96"
                "h-96"
                "bg-gray-700"
                "rounded-full"
                "mix-blend-multiply"
                "filter"
                "blur-3xl"
                "opacity-20"
                "top-1/3"
                "-right-20"
                "animate-blob"
                "animation-delay-4000"
            ]
        ]

        Html.div [
            Attr.classes [ "container"; "mx-auto"; "px-6"; "relative"; "z-10"; "text-center"; "animate-fadeIn" ]
            Html.h1 [ Attr.classes [ "text-6xl"; "font-bold"; "mb-8"; "tracking-tight" ]; Html.text "Stoream" ]
            Html.h2 [ Attr.classes [ "text-3xl"; "font-medium"; "mb-6"; "text-gray-300" ]; Html.text "极简主义者的网盘系统" ]
            Html.p [
                Attr.classes [ "text-xl"; "max-w-2xl"; "mx-auto"; "mb-10"; "text-gray-400" ]
                Html.text "简单、快速、精简且易于部署的 self-hosted 网盘解决方案"
            ]
            Html.div [
                Attr.classes [ "flex"; "flex-wrap"; "justify-center"; "gap-4" ]
                Html.a [
                    Attr.classes [
                        "px-8"
                        "py-3"
                        "rounded-md"
                        "bg-white"
                        "text-black"
                        "font-medium"
                        "transition-all"
                        "duration-300"
                        "hover:bg-gray-200"
                        "focus:outline-none"
                        "focus:ring-2"
                        "focus:ring-gray-300"
                    ]
                    Attr.href "#"
                    Html.text "立即开始"
                ]
                Html.a [
                    Attr.classes [
                        "px-8"
                        "py-3"
                        "rounded-md"
                        "bg-transparent"
                        "border"
                        "border-gray-600"
                        "text-white"
                        "font-medium"
                        "transition-all"
                        "duration-300"
                        "hover:bg-gray-800"
                        "focus:outline-none"
                        "focus:ring-2"
                        "focus:ring-gray-500"
                    ]
                    Attr.href "#"
                    Html.text "了解更多"
                ]
            ]
        ]
    ]

// Features section with elegant cards
let featuresSection () =
    Html.section [
        Attr.classes [ "py-20"; "px-6"; "bg-white" ]
        Html.div [
            Attr.classes [ "container"; "mx-auto" ]
            Html.h2 [ Attr.classes [ "text-4xl"; "font-bold"; "text-center"; "mb-16"; "text-black" ]; Html.text "核心特性" ]

            Html.div [
                Attr.classes [ "grid"; "grid-cols-1"; "md:grid-cols-2"; "lg:grid-cols-3"; "gap-10"; "mt-10" ]

                // Feature 1
                Html.div [
                    Attr.classes [
                        "bg-white"
                        "rounded-md"
                        "border"
                        "border-gray-200"
                        "p-8"
                        "transition-all"
                        "duration-300"
                        "hover:border-gray-400"
                        "group"
                    ]
                    Html.div [
                        Attr.classes [ "flex"; "flex-col"; "items-center"; "text-center" ]
                        Html.div [
                            Attr.classes [
                                "w-16"
                                "h-16"
                                "bg-gray-100"
                                "text-black"
                                "rounded-full"
                                "flex"
                                "items-center"
                                "justify-center"
                                "mb-6"
                                "transition-all"
                                "duration-300"
                                "group-hover:bg-black"
                                "group-hover:text-white"
                            ]
                            Html.i [ Attr.classes [ "fas"; "fa-bolt"; "text-2xl" ] ]
                        ]
                        Html.h3 [ Attr.classes [ "text-xl"; "font-semibold"; "mb-4"; "text-black" ]; Html.text "极简快速" ]
                        Html.p [ Attr.classes [ "text-gray-600" ]; Html.text "基于 .NET 9.0 强大的 Native AOT 支持和高效的 GC，内存占用低，性能强" ]
                    ]
                ]

                // Feature 2
                Html.div [
                    Attr.classes [
                        "bg-white"
                        "rounded-md"
                        "border"
                        "border-gray-200"
                        "p-8"
                        "transition-all"
                        "duration-300"
                        "hover:border-gray-400"
                        "group"
                    ]
                    Html.div [
                        Attr.classes [ "flex"; "flex-col"; "items-center"; "text-center" ]
                        Html.div [
                            Attr.classes [
                                "w-16"
                                "h-16"
                                "bg-gray-100"
                                "text-black"
                                "rounded-full"
                                "flex"
                                "items-center"
                                "justify-center"
                                "mb-6"
                                "transition-all"
                                "duration-300"
                                "group-hover:bg-black"
                                "group-hover:text-white"
                            ]
                            Html.i [ Attr.classes [ "fas"; "fa-lock"; "text-2xl" ] ]
                        ]
                        Html.h3 [ Attr.classes [ "text-xl"; "font-semibold"; "mb-4"; "text-black" ]; Html.text "美观优雅" ]
                        Html.p [ Attr.classes [ "text-gray-600" ]; Html.text "精心设计的前端页面和业务逻辑，极简却不简陋，优雅不失美感" ]
                    ]
                ]

                // Feature 3
                Html.div [
                    Attr.classes [
                        "bg-white"
                        "rounded-md"
                        "border"
                        "border-gray-200"
                        "p-8"
                        "transition-all"
                        "duration-300"
                        "hover:border-gray-400"
                        "group"
                    ]
                    Html.div [
                        Attr.classes [ "flex"; "flex-col"; "items-center"; "text-center" ]
                        Html.div [
                            Attr.classes [
                                "w-16"
                                "h-16"
                                "bg-gray-100"
                                "text-black"
                                "rounded-full"
                                "flex"
                                "items-center"
                                "justify-center"
                                "mb-6"
                                "transition-all"
                                "duration-300"
                                "group-hover:bg-black"
                                "group-hover:text-white"
                            ]
                            Html.i [ Attr.classes [ "fas"; "fa-feather"; "text-2xl" ] ]
                        ]
                        Html.h3 [ Attr.classes [ "text-xl"; "font-semibold"; "mb-4"; "text-black" ]; Html.text "轻量部署" ]
                        Html.p [ Attr.classes [ "text-gray-600" ]; Html.text "以 self-hosted 为目标开发，部署极其便捷" ]
                    ]
                ]
            ]
        ]
    ]

// Tech stack section with elegant cards
let techStackSection () =
    Html.section [
        Attr.classes [ "py-20"; "px-6"; "bg-gray-50" ]
        Html.div [
            Attr.classes [ "container"; "mx-auto" ]
            Html.h2 [ Attr.classes [ "text-4xl"; "font-bold"; "text-center"; "mb-16"; "text-black" ]; Html.text "技术栈" ]

            // Frontend tech
            Html.div [
                Attr.classes [ "mb-16"; "text-center" ]

                Html.div [
                    Attr.classes [ "grid"; "grid-cols-2"; "md:grid-cols-3"; "gap-6"; "max-w-4xl"; "mx-auto" ]

                    // F# Tech Card
                    Html.div [
                        Attr.classes [
                            "bg-white"
                            "rounded-lg"
                            "shadow-sm"
                            "border"
                            "border-gray-200"
                            "p-6"
                            "flex"
                            "flex-col"
                            "items-center"
                            "justify-center"
                            "transition-all"
                            "duration-300"
                            "hover:shadow-md"
                            "hover:border-blue-300"
                        ]
                        Html.div [
                            Attr.classes [ "w-16"; "h-16"; "mb-4" ]
                            Html.img [
                                Attr.src "src/assests/fsharp-logo.svg"
                                Attr.alt "F# Logo"
                                Attr.classes [ "w-full"; "h-full"; "object-contain" ]
                            ]
                        ]
                        Html.span [ Attr.classes [ "font-medium"; "text-gray-800" ]; Html.text "F#" ]
                    ]

                    // Fable Tech Card
                    Html.div [
                        Attr.classes [
                            "bg-white"
                            "rounded-lg"
                            "shadow-sm"
                            "border"
                            "border-gray-200"
                            "p-6"
                            "flex"
                            "flex-col"
                            "items-center"
                            "justify-center"
                            "transition-all"
                            "duration-300"
                            "hover:shadow-md"
                            "hover:border-blue-300"
                        ]

                        Html.div [
                            Attr.classes [ "w-16"; "h-16"; "mb-4" ]
                            Html.img [
                                Attr.src "src/assests/fable-logo.png"
                                Attr.alt "F# Logo"
                                Attr.classes [ "w-full"; "h-full"; "object-contain" ]
                            ]
                        ]
                        Html.span [ Attr.classes [ "font-medium"; "text-gray-800" ]; Html.text "Fable" ]
                    ]

                    // Sutil Tech Card
                    Html.div [
                        Attr.classes [
                            "bg-white"
                            "rounded-lg"
                            "shadow-sm"
                            "border"
                            "border-gray-200"
                            "p-6"
                            "flex"
                            "flex-col"
                            "items-center"
                            "justify-center"
                            "transition-all"
                            "duration-300"
                            "hover:shadow-md"
                            "hover:border-blue-300"
                        ]
                        Html.div [
                            Attr.classes [ "w-16"; "h-16"; "mb-4" ]
                            Html.img [
                                Attr.src "src/assests/sutil-logo.png"
                                Attr.alt "F# Logo"
                                Attr.classes [ "w-full"; "h-full"; "object-contain" ]
                            ]
                        ]
                        Html.span [ Attr.classes [ "font-medium"; "text-gray-800" ]; Html.text "Sutil" ]
                    ]
                ]
            ]

            // Backend tech
            Html.div [
                Attr.classes [ "text-center" ]

                Html.div [
                    Attr.classes [ "grid"; "grid-cols-2"; "md:grid-cols-2"; "gap-6"; "max-w-3xl"; "mx-auto" ]

                    // Giraffe Tech Card
                    Html.div [
                        Attr.classes [
                            "bg-white"
                            "rounded-lg"
                            "shadow-sm"
                            "border"
                            "border-gray-200"
                            "p-6"
                            "flex"
                            "flex-col"
                            "items-center"
                            "justify-center"
                            "transition-all"
                            "duration-300"
                            "hover:shadow-md"
                            "hover:border-blue-300"
                        ]
                        Html.div [
                            Attr.classes [ "w-16"; "h-16"; "mb-4" ]
                            Html.img [
                                Attr.src "src/assests/giraffe-logo.png"
                                Attr.alt "Giraffe Logo"
                                Attr.classes [ "w-full"; "h-full"; "object-contain" ]
                            ]
                        ]
                        Html.span [ Attr.classes [ "font-medium"; "text-gray-800" ]; Html.text "Giraffe" ]
                    ]

                    // .NET Core Tech Card
                    Html.div [
                        Attr.classes [
                            "bg-white"
                            "rounded-lg"
                            "shadow-sm"
                            "border"
                            "border-gray-200"
                            "p-6"
                            "flex"
                            "flex-col"
                            "items-center"
                            "justify-center"
                            "transition-all"
                            "duration-300"
                            "hover:shadow-md"
                            "hover:border-blue-300"
                        ]
                        Html.div [
                            Attr.classes [ "w-16"; "h-16"; "mb-4" ]
                            Html.img [
                                Attr.src "src/assests/dotnet-core-logo.png"
                                Attr.alt ".NET Core Logo"
                                Attr.classes [ "w-full"; "h-full"; "object-contain" ]
                            ]
                        ]
                        Html.span [ Attr.classes [ "font-medium"; "text-gray-800" ]; Html.text ".NET Core" ]
                    ]
                ]
            ]
        ]
    ]

// Call to action section
let ctaSection () =
    Html.section [
        Attr.classes [ "py-20"; "px-6"; "bg-black"; "text-white" ]
        Html.div [
            Attr.classes [ "container"; "mx-auto"; "max-w-4xl" ]
            Html.div [
                Attr.classes [ "text-center"; "rounded-md"; "py-12"; "px-6"; "border"; "border-gray-800" ]
                Html.h2 [ Attr.classes [ "text-3xl"; "md:text-4xl"; "font-bold"; "mb-6" ]; Html.text "准备好体验 Stoream 了吗？" ]
                Html.p [
                    Attr.classes [ "text-xl"; "mb-10"; "text-gray-400"; "max-w-2xl"; "mx-auto" ]
                    Html.text "立即部署属于您自己的网盘系统，让文件管理变得简单高效。"
                ]
                Html.a [
                    Attr.classes [
                        "inline-block"
                        "px-8"
                        "py-4"
                        "bg-white"
                        "text-black"
                        "font-semibold"
                        "rounded-md"
                        "transition-all"
                        "duration-300"
                        "hover:bg-gray-200"
                        "focus:outline-none"
                        "focus:ring-2"
                        "focus:ring-gray-300"
                    ]
                    Attr.href "#"
                    Html.text "立即开始"
                ]
            ]
        ]
    ]

// Footer section
let footerSection () =
    Html.footer [
        Attr.classes [ "bg-black"; "text-gray-500"; "py-12" ]
        Html.div [
            Attr.classes [ "container"; "mx-auto"; "px-6"; "text-center" ]
            Html.p [ Attr.classes [ "mb-4" ]; Html.text "© 2024 The X-Files Research Institute. Stoream - 极简主义者的网盘系统" ]
            Html.div [
                Attr.classes [ "flex"; "justify-center"; "items-center" ]
                Html.a [
                    Attr.classes [
                        "flex"
                        "items-center"
                        "gap-2"
                        "text-gray-400"
                        "hover:text-white"
                        "transition-colors"
                        "duration-300"
                    ]
                    Attr.href "https://github.com/x-fri/stoream"
                    Attr.target "_blank"
                    Html.i [ Attr.classes [ "fab"; "fa-github" ] ]
                    Html.text "GitHub"
                ]
            ]
        ]
    ]

// Create the full landing page
let create () =
    Html.div [
        Attr.classes [ "antialiased"; "font-sans"; "text-gray-900" ]

        // Add styles for animations to be included in the style.css file
        style [
            "::root", [ "--animation-delay-2000", "2s"; "--animation-delay-4000", "4s" ]
            "@keyframes blob",
            [
                "0%", [ "transform", "translate(0px, 0px) scale(1)" ]
                "33%", [ "transform", "translate(30px, -50px) scale(1.1)" ]
                "66%", [ "transform", "translate(-20px, 20px) scale(0.9)" ]
                "100%", [ "transform", "translate(0px, 0px) scale(1)" ]
            ]
            ".animate-blob", [ "animation", "blob 7s infinite" ]
            ".animation-delay-2000", [ "animation-delay", "var(--animation-delay-2000)" ]
            ".animation-delay-4000", [ "animation-delay", "var(--animation-delay-4000)" ]
            ".animate-fadeIn", [ "animation", "fadeIn 1.5s ease-in-out" ]
            "@keyframes fadeIn",
            [
                "0%", [ "opacity", "0"; "transform", "translateY(20px)" ]
                "100%", [ "opacity", "1"; "transform", "translateY(0)" ]
            ]
        ]

        heroSection ()
        featuresSection ()
        techStackSection ()
        ctaSection ()
        footerSection ()
    ]
