module App.Types.Router

type RouterState = { CurrentUrl : string list }
type RouterMsg = UrlChanged of string list
