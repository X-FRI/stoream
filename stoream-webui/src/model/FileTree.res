@genType("FileTree_t")
type rec t = {
  name: string,
  sub: array<t>,
  path: string,
}

@genType
let from_json = folder => {
  let object = folder->Js.Json.decodeObject

  object
  ->Option.map(folder => {
    switch (folder->Js_dict.get("name"), folder->Js_dict.get("path")) {
    | (Some(Js.Json.String(name)), Some(Js.Json.String(path))) => Ok(name, path)
    | _ => Error(Errors.Request(Errors.Request.RequestError))
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
