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
    | WrongPassword
    | RequestError
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
module LoginResponse = {
  let status = response => {
    response
    ->Js.Json.decodeObject
    ->Option.flatMap(response => {
      response->Js_dict.get("status")
    })
  }
}

@genType
module RequestLogin: {
  let request: t => RescriptCore.Promise.t<result<Js.Json.t, Errors.t>>
} = {
  open Fetch

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
    switch check(user)->Result.map(Encrypted.encryptedUser) {
    | Ok(user) =>
      Fetch.fetch(
        "http://localhost:9993/login?username=" ++ user.username ++ "&password=" ++ user.password,
        {mode: #cors},
      )
      ->Promise.then(Response.json)
      ->Promise.thenResolve(response => {
        response
        ->LoginResponse.status
        ->Option.map(status => {
          switch status {
          | Js.Json.String("OK") => Ok(response)
          | Js.Json.String("ERR") => Error(Errors.WrongPassword)
          | _ => Error(Errors.RequestError)
          }
        })
        ->Option.getOr(Error(Errors.RequestError))
      })
    | Error(e) => Promise.resolve(Error(e))
    }
  }
}
