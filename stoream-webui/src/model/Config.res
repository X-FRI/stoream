@genType.as("Config")
type t = {engine: string}

@val @scope(("window", "location"))
external host: string = "host"

@val @scope(("window", "localStorage"))
external devMode: string = "devMode"

let config: t = {
  engine: if devMode == "true" {
    "http://localhost:9993"
  } else {
    ""
  },
}
