module stoream.engine.Module.Auth.Repository.User

open Dapper.FSharp.SQLite
open stoream.engine.Module.Auth.Entity.User
open stoream.engine.Module.Infrastructure.DB

let private UserTable = table'<UserEntity> "Users"

let Register (userEntity : UserEntity) =
    insert {
        into UserTable
        value userEntity
    }
    |> DB.InsertAsync

let FindUnique (username : string) = task {
    let! users =
        select {
            for user in UserTable do
                where (user.Username = username)
        }
        |> DB.SelectAsync<UserEntity>
    return users.GetEnumerator ()
}
