@genType
type t = {
  username: string,
  password: string,
}

@genType
module Errors = {
  type t =
    | UsernameIsEmpty
    | PasswordIsEmpty

  let toString = error => {
    switch error {
    | UsernameIsEmpty => "The username is empty!"
    | PasswordIsEmpty => "The password is empty!"
    }
  }
}

@genType
module Encrypted = {
  @module("js-md5") external md5: string => string = "md5"

  /// The user's password is encrypted by this function and sent to the engine.
  let encryptedUser = user => {
    {
      username: user.username,
      password: md5(user.password),
    }
  }
}

@genType
module RequestLogin: {
  let request: t => result<t, Errors.t>
} = {
  /// Check whether the logged in expression is legal.
  let check = user => {
    if Js.String.length(user.username) == 0 {
      Error(Errors.UsernameIsEmpty)
    } else if Js.String.length(user.password) == 0 {
      Error(Errors.PasswordIsEmpty)
    } else {
      Ok(user)
    }
  }

  let request = user => {
    check(user)->Result.map(user => {
      // login logic
      user
    })
  }
}