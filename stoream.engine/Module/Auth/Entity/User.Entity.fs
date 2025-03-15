module stoream.engine.Module.Auth.Entity.User

open System

type public UserEntity = { Id : Guid; Username : string; PasswordHash : string }
