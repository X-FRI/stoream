module Types

open System

let private strCaseEq s1 s2 = String.Equals(s1, s2, StringComparison.CurrentCultureIgnoreCase)

type Page =
    | Login
    | Home
    | Users
    with
        static member All = [
            "Home", Home
            "Users", Users
            "Login", Login ]
        static member Find (name : string) =
                        Page.All
                        |> List.tryFind (fun (pname,page) -> strCaseEq pname name)
                        |> Option.map snd

type AuthToken = string // Or, use <'AuthToken> for LoggedInUser etc

type LoggedInUser = {
    Name : string
    AuthToken : AuthToken
}

type Model = {
    User : LoggedInUser option
    Page : Page // Main view
    ErrorMessage : string // Error message for login panel
    Greeting : string // Greeting for home page
    }

// Model helpers
let getUser m = m.User
let getPage m = m.Page
let getErrorMessage m = m.ErrorMessage
let getGreeting m = m.Greeting
