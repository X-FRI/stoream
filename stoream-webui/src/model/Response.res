@genType
module User = {
  /// Get the status value from the response returned by engine
  let status = (response: Js.Json.t): result<string, Errors.t> => {
    switch response
    ->Js.Json.decodeObject
    ->Option.flatMap(response => {
      response
      ->Js_dict.get("status")
      ->Option.flatMap(status => {
        switch status {
        | Js.Json.String(status) => Some(status)
        | _ => None
        }
      })
    }) {
    | Some(status) => Ok(status)
    | None => Error(Errors.User(Errors.User.CannotGetTheStatus))
    }
  }
}

@genType
module FileTree = {
  @genType.import("./FileTree.gen.tsx")
  type t

  /// Get the file name in the path.
  /// NOTE: Backslashes may be used as path separators in the paths returned by engine on Windows.
  let basename = (path: string): result<string, Errors.t> => {
    let path_array = String.split(path, "/")
    Array.reverse(path_array)
    switch path_array[0] {
    | Some(path) => Ok(path)
    | None => Error(Errors.FileTree(Errors.FileTree.CannotGetTheBasename(path)))
    }
  }

  /// Convert the response returned by engine to FileTree.t
  let toFolderList = (response: Js.Json.t, path: string): result<FileTree.t, Errors.t> => {
    switch response {
    | Js.Json.Array(folderList) =>
      basename(path)->Result.map(name => {
        open FileTree
        {name, sub: folderList->Array.map(from_json), path}
      })
    | _ => Error(Errors.Request(Errors.Request.RequestError))
    }
  }
}
