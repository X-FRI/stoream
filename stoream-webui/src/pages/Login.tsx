import { Display, Image, Page, Spacer, useModal } from "@geist-ui/core";
import React from "react";
import LoginForm from "../components/LoginForm.tsx";
import ErrorModal from "../components/ErrorModal.tsx";

const Login = () => {
    const [errorMessage, setErrorMessage] = React.useState("Unknwon")
    const [errorMessageTitle, setErrorMessageTitle] = React.useState("Unknwon")
    const { visible, setVisible, bindings } = useModal()

    return (
        <>
            <Page width="100%">
                <Spacer h={5} />
                <Display shadow caption={"No one's soul deserves to be remembered."}>
                    <Spacer h={2.5} />
                    <Image width="350px" height="150px" src="./src/assets/logo.png" />
                    <Spacer h={2.5} />
                    <LoginForm
                        setErrorMessage={setErrorMessage}
                        setErrorMessageTitle={setErrorMessageTitle}
                        setVisible={setVisible}
                    />
                    <Spacer h={2.5} />
                </Display>
                <ErrorModal
                    bindings={bindings}
                    errorMessage={errorMessage}
                    errorMessageTitle={errorMessageTitle}
                    setVisible={setVisible} />
            </Page>
        </>
    )
}

export default Login