module stoream.engine.Module.Auth.AuthService

open System.Threading.Tasks
open Microsoft.Extensions.Logging
open stoream.engine.Module.Auth.DTO.UserLogin
open stoream.engine.Module.Auth.Entity.User
open Giraffe
open stoream.engine.Module.Infrastructure.Logger
open BCrypt.Net

let UserLogin (userLoginRequestDTO : UserLoginRequestDTO) : Task<HttpHandler> = task {
    let! user = Repository.User.FindUnique userLoginRequestDTO.Username

    if user.MoveNext () |> not then
        Logger.LogWarning $"There is no user named '{userLoginRequestDTO.Username}' in the database"
        return RequestErrors.BAD_REQUEST "Wrong username or password!"
    else if BCrypt.Verify (userLoginRequestDTO.Password, user.Current.PasswordHash) then
        Logger.LogInformation $"User {userLoginRequestDTO.Username} successfully logged in"
        return Successful.OK ""
    else
        Logger.LogWarning "User password is incorrect"
        return RequestErrors.BAD_REQUEST "Wrong username or password!"
}

let UserRegister (userEntity : UserEntity) : Task<HttpHandler> = task {
    match! Repository.User.Register userEntity with
    | 1 ->
        Logger.LogInformation "User registration successful"
        return Successful.OK ""
    | insertedRows ->
        Logger.LogCritical $"User registration failed! {insertedRows} records have been inserted into the database!"
        return ServerErrors.INTERNAL_ERROR ""
}
