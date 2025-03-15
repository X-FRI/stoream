module stoream.engine.Module.Auth.Mapper.UserRegister

open System
open System.Security.Cryptography
open BCrypt.Net
open stoream.engine.Module.Auth.DTO.UserRegister
open stoream.engine.Module.Auth.Entity.User

module UserRegisterRequestDTOMapper =
    let ToUserEntity (userRegisterRequestDTO : UserRegisterRequestDTO) : UserEntity =
        use sha1 = SHA1.Create ()
        let passwordHash = userRegisterRequestDTO.Password |> BCrypt.HashPassword
        {
            Id = Guid.NewGuid ()
            Username = userRegisterRequestDTO.Username
            PasswordHash = passwordHash.ToString ()
        }
