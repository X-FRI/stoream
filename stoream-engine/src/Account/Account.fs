module Stoream.Engine.Account

open System
open Config

type Account() =
    static member public CONFIG = Config.CONFIG.Account

    static member public Check(username: String, password: String) =
        username = Account.CONFIG.Username && password = Account.CONFIG.Password
