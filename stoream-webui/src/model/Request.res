/// Copyright (c) 2024 The X-Files Research Institute
/// 
/// All rights reserved.
/// 
/// Redistribution and use in source and binary forms, with or without modification,
/// are permitted provided that the following conditions are met:
/// 
///     * Redistributions of source code must retain the above copyright notice,
///       this list of conditions and the following disclaimer.
///     * Redistributions in binary form must reproduce the above copyright notice,
///       this list of conditions and the following disclaimer in the documentation
///       and/or other materials provided with the distribution.
///     * Neither the name of Stoream nor the names of its contributors
///       may be used to endorse or promote products derived from this software
///       without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
/// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
/// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
/// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
/// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
/// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
/// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
/// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
/// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
/// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
/// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

@genType
module FileTree = {
  @genType.import("./FileTree.gen.tsx")
  type t

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
