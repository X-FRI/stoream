/// Copyright (c) 2024 The X-Files Research Institute
/// 
/// All rights reserved.
/// 
/// Redistribution and use in source and binary forms, with or without modification,
/// are permitted provided that the following conditions are met:
/// 
///     * Redistributions of source code must retain the above copyright notice,
///       this list of conditions and the following disclaimer.
///     * Redistributions in binary form must reproduce the above copyright notice,
///       this list of conditions and the following disclaimer in the documentation
///       and/or other materials provided with the distribution.
///     * Neither the name of Stoream nor the names of its contributors
///       may be used to endorse or promote products derived from this software
///       without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
/// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
/// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
/// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
/// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
/// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
/// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
/// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
/// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
/// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
/// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { Button, Grid, Input, Spacer, useToasts } from "@geist-ui/core"
import { LogIn, User as UserIcon } from "@geist-ui/icons"
import React from "react";
import { useNavigate } from "react-router-dom";
import { User as RequestUser } from "../model/Request.gen.tsx"
import { toString } from "../model/Errors.gen.tsx"

const login = async (user, setToast, navigate) => {
    await
        RequestUser
            .request(user)
            .then(result => {
                if (result.TAG === "Error") {
                    setToast({ text: toString(result._0), type: "error" })
                } else {
                    navigate("/files")
                }
            })
            .catch(reason => {
                setToast({ text: String(reason), type: "error" })
            })
}

const LoginForm = () => {
    const [loginButtonLoading, setLoginButtonLoading] = React.useState(false);
    const usernameRef: any = React.useRef("")
    const passwordRef: any = React.useRef("")
    const navigate = useNavigate()
    const { setToast } = useToasts({ placement: "topRight", padding: "1em" })

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
                                setToast,
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