import { Button, Grid, Input, Spacer } from "@geist-ui/core"
import { LogIn, User as UserIcon } from "@geist-ui/icons"
import React from "react";
import { useNavigate } from "react-router-dom";
import { User as RequestUser } from "../model/Request.gen.tsx"

const login = async (user, setErrorMessage, setErrorMessageTitle, setErrorModalVisible, navigate) => {
    await
        RequestUser
            .request(user)
            .then(result => {
                if (result.TAG === "Error") {
                    setErrorMessageTitle(result._0.TAG)
                    setErrorMessage(result)
                    setErrorModalVisible(true)
                } else {
                    navigate("/files")
                }
            })
            .catch(reason => {
                setErrorMessageTitle("There was a problem during login")
                setErrorMessage(String(reason))
                setErrorModalVisible(true)
            })
}

const LoginForm = ({ setErrorMessage, setErrorMessageTitle, setVisible }) => {
    const [loginButtonLoading, setLoginButtonLoading] = React.useState(false);
    const usernameRef: any = React.useRef("")
    const passwordRef: any = React.useRef("")
    const navigate = useNavigate()

    return (
        <>
            <Grid.Container width="100%">
                <Grid xs={24} justify="space-around" alignContent="space-around" alignItems="baseline">
                    <Spacer w={0.5} />
                    {/* @ts-ignore comment */}
                    <Input iconRight={<UserIcon />} clearable label="username" placeholder="" ref={usernameRef} />
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
                                navigate,
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