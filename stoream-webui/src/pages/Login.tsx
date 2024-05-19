import { Button, Display, Grid, Image, Input, Modal, Page, Spacer, useModal } from "@geist-ui/core";
import { User, LogIn } from '@geist-ui/icons'
import React from "react";
import { RequestLogin, t as LoginUser } from "../model/User.gen.tsx"
import Main from "./Main.tsx"

const login = (user: LoginUser, setErrorMessage, setErrorMessageTitle, setErrorModalVisible) => {
    let result = RequestLogin.request(user)
    if (result.TAG === "Error") {
        setErrorMessageTitle("There was a problem during login")
        setErrorModalVisible(true)
        if (result._0 === "UsernameIsEmpty") {
            setErrorMessage("The username is empty!")
        } else if (result._0 === "PasswordIsEmpty") {
            setErrorMessage("The password is empty!")
        } else {
            setErrorMessage("Unknown error")
        }
        return false
    } else {
        return true
    }
}

const ErrorModal = ({ bindings, errorMessageTitle, errorMessage, setVisible }) => {
    return (
        <>
            <Modal {...bindings}>
                <Modal.Title>Error</Modal.Title>
                <Modal.Subtitle>{errorMessageTitle}</Modal.Subtitle>
                <Modal.Content>
                    <p>{errorMessage}</p>
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>I see</Modal.Action>
            </Modal>
        </>
    )
}

const Login = () => {
    const [loginButtonLoading, setLoginButtonLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Unknwon")
    const [errorMessageTitle, setErrorMessageTitle] = React.useState("Unknwon")
    const [MainHidden, setMainHidden] = React.useState(true)
    const [LoginHidden, setLoginHidden] = React.useState(false)
    const { visible, setVisible, bindings } = useModal()
    const usernameRef: any = React.useRef("")
    const passwordRef: any = React.useRef("")

    return (
        <>
            <div hidden={LoginHidden}>
                <Page width="100%">
                    <Spacer h={5} />
                    <Display shadow caption={"No one's soul deserves to be remembered."}>
                        <Spacer h={2.5} />
                        <Image width="350px" height="150px" src="./src/assets/logo.png" />
                        <Spacer h={2.5} />
                        <Grid.Container width="100%">
                            <Grid xs={24} justify="space-around" alignContent="space-around" alignItems="baseline">
                                <Spacer w={0.5} />
                                <Input iconRight={<User />} clearable label="username" placeholder="" ref={usernameRef} />
                                <Spacer w={0.5} />
                            </Grid>
                            <Spacer h={1} />
                            <Grid xs={24} justify="center" alignContent="center" alignItems="center">
                                <Spacer w={0.5} />
                                <Input.Password clearable label="password" placeholder="" ref={passwordRef} />
                                <Spacer w={0.5} />
                            </Grid>
                            <Spacer h={2} />
                            <Grid xs={24} justify="center" alignContent="center" alignItems="center">
                                <Button
                                    icon={<LogIn />}
                                    type="secondary"
                                    scale={0.85}
                                    loading={loginButtonLoading}
                                    onClick={() => {
                                        setLoginButtonLoading(true)
                                        if (login(
                                            {
                                                username: usernameRef.current.value,
                                                password: passwordRef.current.value
                                            },
                                            setErrorMessage,
                                            setErrorMessageTitle,
                                            setVisible
                                        )) {
                                            setMainHidden(false)
                                            setLoginHidden(true)
                                        }
                                        setLoginButtonLoading(false)
                                    }}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid.Container>
                        <Spacer h={2.5} />
                    </Display>
                    <ErrorModal bindings={bindings} errorMessage={errorMessage} errorMessageTitle={errorMessageTitle} setVisible={setVisible} />
                </Page>
            </div>
            <Main hidden={MainHidden} />
        </>
    )
}

export default Login