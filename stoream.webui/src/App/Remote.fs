module Remote

open Types

type Server() =
    member _.AuthorizeUser(name, passwd) : Async<AuthToken> =
        async {
            // Your super secure no-password-over-cleartext solution here
            if name = "" || passwd <> "sutilx9" then
                failwith "User credentials incorrect"
            return "auth-0001"
        }