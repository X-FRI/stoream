module Router

open Types

open Browser.Types

let parseHash (location: Location) =
    let hash =
        if location.hash.Length > 1 then location.hash.Substring 1
        else ""
    if hash.Contains("?") then
        let h = hash.Substring(0, hash.IndexOf("?"))
        h, hash.Substring(h.Length+1)
    else
        hash, ""

let parseUrl (location: Location) =
    parseHash location

let parseRoute (loc:Location) : Page =
    let hash, query = (parseUrl loc)
    match Page.Find hash with
    | Some p -> p
    | None -> Home

