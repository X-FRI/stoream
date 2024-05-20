import { Button, Grid, Input, Spacer } from "@geist-ui/core"
import { LogIn, User } from "@geist-ui/icons"
import React from "react";
import { RequestLogin, t as LoginUser } from "../model/User.gen.tsx"

const login = async (user, setErrorMessage, setErrorMessageTitle, setErrorModalVisible, setMainHidden, setLoginHidden) => {
    await
        RequestLogin
            .request(user)
            .then(result => {
                if (result.TAG === "Error") {
                    setErrorMessageTitle("There was a problem during login")
                    setErrorModalVisible(true)
                    if (result._0 === "UsernameIsEmpty") {
                        setErrorMessage("The username is empty!")
                    } else if (result._0 === "PasswordIsEmpty") {
                        setErrorMessage("The password is empty!")
                    } else if (result._0 === "WrongPassword") {
                        setErrorMessage("wrong user name or password")
                    } else {
                        setErrorMessage("Unknown error")
                    }
                } else {
                    setMainHidden(false)
                    setLoginHidden(true)
                }
            })
            .catch(reason => {
                setErrorMessageTitle("There was a problem during login")
                setErrorMessage(String(reason))
                setErrorModalVisible(true)
            })
}

const LoginForm = ({ setErrorMessage, setErrorMessageTitle, setVisible, setMainHidden, setLoginHidden }) => {
    const [loginButtonLoading, setLoginButtonLoading] = React.useState(false);
    const usernameRef: any = React.useRef("")
    const passwordRef: any = React.useRef("")

    return (
        <>
            <Grid.Container width="100%">
                <Grid xs={24} justify="space-around" alignContent="space-around" alignItems="baseline">
                    <Spacer w={0.5} />
                    {/* @ts-ignore comment */}
                    <Input iconRight={<User />} clearable label="username" placeholder="" ref={usernameRef} />
                    <Spacer w={0.5} />
                </Grid>
                <Spacer h={1} />
                <Grid xs={24} justify="center" alignContent="center" alignItems="center">
                    <Spacer w={0.5} />
                    {/* @ts-ignore comment */}
                    <Input.Password clearable label="password" placeholder="" ref={passwordRef} />
                    <Spacer w={0.5} />
                </Grid>
                <Spacer h={2} />
                <Grid xs={24} justify="center" alignContent="center" alignItems="center">
                    {/* @ts-ignore comment */}
                    <Button
                        icon={<LogIn />}
                        type="secondary"
                        scale={0.85}
                        loading={loginButtonLoading}
                        onClick={async () => {
                            setLoginButtonLoading(true)
                            await login(
                                {
                                    username: usernameRef.current.value,
                                    password: passwordRef.current.value
                                },
                                setErrorMessage,
                                setErrorMessageTitle,
                                setVisible,
                                setMainHidden,
                                setLoginHidden
                            )
                            setLoginButtonLoading(false)
                        }}>
                        Login
                    </Button>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default LoginForm