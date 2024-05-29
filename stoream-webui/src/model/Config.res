@genType.as("Config")
type t = {engine: string}

module Import: {
  let value: t
} = {
  @module("../../stoream-webui.json")
  external config: Js.Json.t = "default"
  let stringify = config->Js.Json.stringify

  let value: t = {
    switch config->Js.Json.decodeObject {
    | Some(config) =>
      let engine = switch config->Js_dict.get("engine") {
      | Some(Js.Json.String(engine)) => engine
      | _ => Js.Exn.raiseError(`Invalid config, wrong engine field: ${stringify}`)
      }
      {engine: engine}
    | None => Js.Exn.raiseError(`Invalid config: ${stringify}`)
    }
  }
}

let config: ref<t> = ref(Import.value)
let setConfig = (~engine: option<string>=?) => {
  config.contents = {
    engine: Option.getOr(engine, config.contents.engine),
  }
}

let value = () => config.contents