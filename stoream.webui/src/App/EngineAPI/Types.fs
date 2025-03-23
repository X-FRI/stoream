namespace rec Engine.Types

type UserLoginRequestDTO =
    { username: Option<string>
      password: Option<string> }
    ///Creates an instance of UserLoginRequestDTO with all optional fields initialized to None. The required fields are parameters of this function
    static member Create (): UserLoginRequestDTO = { username = None; password = None }

type UserLoginResponseDTO =
    { id: Option<string> }
    ///Creates an instance of UserLoginResponseDTO with all optional fields initialized to None. The required fields are parameters of this function
    static member Create (): UserLoginResponseDTO = { id = None }

type UserRegisterRequestDTO =
    { username: Option<string>
      password: Option<string> }
    ///Creates an instance of UserRegisterRequestDTO with all optional fields initialized to None. The required fields are parameters of this function
    static member Create (): UserRegisterRequestDTO = { username = None; password = None }

[<RequireQualifiedAccess>]
type PostAuthLogin =
    ///OK
    | OK of payload: UserLoginResponseDTO

[<RequireQualifiedAccess>]
type PostAuthRegister =
    ///OK
    | OK
