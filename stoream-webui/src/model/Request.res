@genType
module FileTree = {
  @genType.import("./FileTree.gen.tsx")
  type t

  open FileTree

  let request = async (path: string): result<FileTree.t, Errors.t> => {
    let _request = async (path: string) => {
      await Fetch.fetch("http://localhost:9993/path?path=" ++ path, {mode: #cors})
      ->Promise.then(Fetch.Response.json)
      ->Promise.thenResolve(response => Response.FileTree.toFolderList(response, path))
    }
    if String.length(path) == 0 {
      await _request("")
    } else {
      await _request(path)
    }
  }
}

@genType
module User = {
  @genType.import("./User.gen.tsx")
  type t

  open User

  /// Check whether the logged in expression is legal.
  let check = (user: User.t): result<User.t, Errors.t> => {
    if Js.String.length(user.username) == 0 {
      Error(Errors.User(Errors.User.UsernameIsEmpty))
    } else if Js.String.length(user.password) == 0 {
      Error(Errors.User(Errors.User.PasswordIsEmpty))
    } else {
      Ok(user)
    }
  }

  let request = async (user: User.t): result<User.t, Errors.t> => {
    switch check(user)->Result.map(Encrypted.encryptedUser) {
    | Error(e) => Error(e)
    | Ok(user) =>
      await Fetch.fetch(
        "http://localhost:9993/login?username=" ++ user.username ++ "&password=" ++ user.password,
        {mode: #cors},
      )
      ->Promise.then(Fetch.Response.json)
      ->Promise.thenResolve(response => {
        response
        ->Response.User.status
        ->Result.flatMap(status => {
          switch status {
          | "OK" => Ok(user)
          | "ERR" => Error(Errors.User(Errors.User.WrongPassword))
          | _ => Error(Errors.Request(Errors.Request.RequestError))
          }
        })
      })
    }
  }
}
