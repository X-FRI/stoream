@genType
type rec t = {
  name: string,
  sub: array<t>,
  path: string,
}

@genType
module Error = {
  type t = RequestError
}

@genType
module RequestPath: {
  // let request: string => promise<result<t, Error.t>>
  let request: string => promise<t>
} = {
  open Fetch

  let basename = path => {
    let path = String.split(path, "/")
    Array.reverse(path)
    path[0]->Option.getExn
  }

  let from_json = folder => {
    let object = folder->Js.Json.decodeObject

    object
    ->Option.map(folder => {
      switch (folder->Js_dict.get("name"), folder->Js_dict.get("path")) {
      | (Some(Js.Json.String(name)), Some(Js.Json.String(path))) => Ok(name, path)
      | _ => Error(Error.RequestError)
      }
    })
    ->Option.map(info => {
      info->Result.map(((name, path)) => {
        name,
        path,
        sub: [],
      })
    })
    ->Option.getExn
    ->Result.getExn
  }

  let request = (path: string) => {
    let _request = (path: string) => {
      Fetch.fetch("http://localhost:9993/path?path=" ++ path, {mode: #cors})
      ->Promise.then(Response.json)
      ->Promise.thenResolve(response => {
        switch response {
        | Js.Json.Array(folderList) =>
          Ok({name: basename(path), sub: folderList->Array.map(from_json), path})
        | _ => Error(Error.RequestError)
        }
      })->Promise.thenResolve(Result.getExn)
    }
    if String.length(path) == 0 {
      _request("")
    } else {
      _request(path)
    }
  }
}