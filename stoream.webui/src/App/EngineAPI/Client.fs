namespace rec Engine

open Browser.Types
open Fable.SimpleHttp
open Engine.Types
open Engine.Http

///stoream
type EngineClient(url: string, headers: list<Header>) =
    new(url: string) = EngineClient(url, [])

    ///<summary>
    ///User and authentication
    ///</summary>
    member this.PostAuthLogin(body: UserLoginRequestDTO) =
        async {
            let requestParts = [ RequestPart.jsonContent body ]
            let! (status, content) = OpenApiHttp.postAsync url "/auth/login" headers requestParts
            return PostAuthLogin.OK(Serializer.deserialize content)
        }

    ///<summary>
    ///User and authentication
    ///</summary>
    member this.PostAuthRegister(body: UserRegisterRequestDTO) =
        async {
            let requestParts = [ RequestPart.jsonContent body ]
            let! (status, content) = OpenApiHttp.postAsync url "/auth/register" headers requestParts
            return PostAuthRegister.OK
        }
