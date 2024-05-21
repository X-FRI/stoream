@genType
module User = {
  type t =
    | UsernameIsEmpty
    | PasswordIsEmpty
    | WrongPassword
    | CannotGetTheStatus
}

@genType
module FileTree = {
  type t = 
    | CannotGetTheBasename(string)
}

@genType
module Request = {
  type t = RequestError
}

@genType
type t =
  | Request(Request.t)
  | User(User.t)
  | FileTree(FileTree.t)
