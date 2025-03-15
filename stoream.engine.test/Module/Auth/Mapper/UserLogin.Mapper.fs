module stoream.engine.test.Module.Auth.Mapper.UserLogin

open NUnit.Framework
open stoream.engine.Module.Auth.DTO.UserLogin
open stoream.engine.Module.Auth.Mapper.UserLogin
open BCrypt.Net

[<TestFixture>]
type UserLoginRequestDTOMapper () =
    [<Test>]
    member this.ToUserEntity () =
        let userLoginRequestDTO : UserLoginRequestDTO = { Username = "Somhairle H. Marisol"; Password = "123456" }
        let userEntity = UserLoginRequestDTOMapper.ToUserEntity userLoginRequestDTO
        Assert.That (BCrypt.Verify ("123456", userEntity.PasswordHash))
