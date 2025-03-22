module stoream.engine.Module.Auth.AuthModule

open stoream.engine.Module.Auth.DTO.UserLogin
open stoream.engine.Module.Auth.DTO.UserRegister
open Microsoft.AspNetCore.Http
open Giraffe.EndpointRouting
open Giraffe.OpenApi

let private TAG = "Auth"
let private SUMMARY = "验证相关"

let Endpoints =
    POST [
        (route "/auth/login" AuthHandler.UserLogin)
        |> configureEndpoint _.WithTags(TAG)
        |> configureEndpoint _.WithSummary(SUMMARY)
        |> configureEndpoint _.WithDescription("登陆")
        |> addOpenApi begin
            OpenApiConfig (requestBody = RequestBody typeof<UserLoginRequestDTO>, responseBodies = [| ResponseBody typeof<string> |])
        end

        route "auth/register" AuthHandler.UserRegister
        |> addOpenApi (OpenApiConfig (requestBody = RequestBody (typeof<UserRegisterRequestDTO>)))
    ]
