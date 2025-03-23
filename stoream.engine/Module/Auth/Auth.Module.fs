module stoream.engine.Module.Auth.AuthModule

open stoream.engine.Module.Auth.DTO.UserLogin
open stoream.engine.Module.Auth.DTO.UserRegister
open Microsoft.AspNetCore.Http
open Giraffe.EndpointRouting
open Giraffe.OpenApi

let private TAG = "Auth"
let private SUMMARY = "User and authentication"

let private commonEndpointConfiguration endpoint =
    endpoint
    |> configureEndpoint _.WithTags(TAG)
    |> configureEndpoint _.WithSummary(SUMMARY)

let Endpoints =
    POST [
        (route "/auth/login" AuthHandler.UserLogin)
        |> commonEndpointConfiguration
        |> addOpenApi begin
            OpenApiConfig (requestBody = RequestBody typeof<UserLoginRequestDTO>, responseBodies = [| ResponseBody typeof<UserLoginResponseDTO> |])
        end

        route "/auth/register" AuthHandler.UserRegister
        |> commonEndpointConfiguration
        |> addOpenApi begin OpenApiConfig (requestBody = RequestBody typeof<UserRegisterRequestDTO>) end
    ]
