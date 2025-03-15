module stoream.engine.Module.Auth.AuthModule

open Giraffe

let Handlers : HttpHandler =
    choose [
        POST
        >=> choose [ AuthHandler.UserLogin; AuthHandler.UserRegister ]
    ]
