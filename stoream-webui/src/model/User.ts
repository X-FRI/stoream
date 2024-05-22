import { md5 } from "js-md5";

export class User {
    readonly username: string;
    readonly password: string;

    public constructor(username: string, password: string) {
        this.password = md5(password)
        this.username = username
    }

    public requestLogin = async (): Promise<void> => {
        const response: Response = await (await fetch(
            "http://localhost:9993/login?username=" + this.username + "&password=" + this.password,
            { mode: "cors" }
        )).json()

        if (response.status != "OK") {
            throw new Error("Wrong username or password")
        } else {
            return;
        }
    }
};

type Response = {
    status: string
}