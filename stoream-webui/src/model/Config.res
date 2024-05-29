@genType.as("Config")
type t = {engine: string}

@val @scope(("window", "location"))
external engine: string = "host"

let config: t = {engine: engine}