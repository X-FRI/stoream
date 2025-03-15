module stoream.engine.Module.Auth.AuthHandler

open Giraffe
open Microsoft.AspNetCore.Http
open DTO.UserLogin
open stoream.engine.Module.Auth.DTO.UserRegister
open stoream.engine.Module.Auth.Mapper.UserRegister

let UserRegister : HttpHandler =
    route "/auth/register"
    >=> fun (next : HttpFunc) (ctx : HttpContext) -> task {
        let! userLoginDTO = ctx.BindJsonAsync<UserRegisterRequestDTO> ()

        return!
            userLoginDTO
            |> UserRegisterRequestDTOMapper.ToUserEntity
            |> AuthService.UserRegister
            |> fun response -> json response next ctx
    }


let UserLogin : HttpHandler =
    route "/auth/login"
    >=> fun (next : HttpFunc) (ctx : HttpContext) -> task {
        let! userLoginDTO = ctx.BindJsonAsync<UserLoginRequestDTO> ()

        return!
            userLoginDTO
            |> AuthService.UserLogin
            |> fun response -> json response next ctx
    }
