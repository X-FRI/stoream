module Stoream.Engine.Server

open System
open Suave
open Config

type Server() =
    static member public CONFIG = Config.CONFIG.Server

    static member public Start() =
        let cts = new Threading.CancellationTokenSource()

        let conf =
            { defaultConfig with
                cancellationToken = cts.Token
                bindings =
                    [ (HttpBinding.create HTTP (Server.CONFIG.Hostname |> Net.IPAddress.Parse) Server.CONFIG.Port) ] }

        let listening, server = startWebServerAsync conf (Successful.OK "Hello World")

        Async.Start(server, cts.Token)
        Console.ReadKey true |> ignore

        cts.Cancel()
