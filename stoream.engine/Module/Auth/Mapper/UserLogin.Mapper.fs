module stoream.engine.Module.Auth.Mapper.UserLogin

open System
open System.Security.Cryptography
open BCrypt.Net
open stoream.engine.Module.Auth.DTO.UserLogin
open stoream.engine.Module.Auth.Entity.User

module UserLoginRequestDTOMapper =

    /// FIXME: This seems unnecessary
    let ToUserEntity (userLoginRequestDTO : UserLoginRequestDTO) : UserEntity =
        use sha1 = SHA1.Create ()
        let passwordHash = userLoginRequestDTO.Password |> BCrypt.HashPassword
        {
            Id = Guid.Empty
            Username = userLoginRequestDTO.Username
            PasswordHash = passwordHash.ToString ()
        }
