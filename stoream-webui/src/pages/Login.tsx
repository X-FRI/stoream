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

import { Block } from "baseui/block";
import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import { HeadingLarge } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import { User } from "../model/User"
import { PLACEMENT, KIND, toaster, ToasterContainer } from "baseui/toast";
import React from "react";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameInputError, setUsernameInputError] = React.useState("");
  const [passwordInputError, setPasswordInputError] = React.useState("");
  const [toastKey, setToastKey] = React.useState<string | number | null>(null);

  const login = async (): Promise<void> => {
    if (username.length == 0) return setUsernameInputError("Username cannot be empty");
    if (password.length == 0) return setPasswordInputError("Password cannot be empty");

    return await new User(username, password).requestLogin().then(() => {
      // @ts-ignore
      setToastKey(toaster.info("Successfully logged in user " + username, {kind: KIND.info}));
    }).catch(reason => {
      // @ts-ignore
      setToastKey(toaster.info(String(reason), {kind: KIND.negative}));
    })
  };

  return (
    <>
      <Block marginTop={"15%"}>
        <ToasterContainer placement={PLACEMENT.topRight} autoHideDuration={3000} />
          <Grid align={ALIGNMENT.center}>
            <Cell skip={[0]} span={[4, 8, 12]}>
              <HeadingLarge>Login to stoream</HeadingLarge>
            </Cell>

            <Cell skip={[0]} span={[4, 8, 10]}>
              <FormControl
                caption="Lowercase English letter combination"
                error={usernameInputError}
              >
                <Input
                  placeholder="Username"
                  onChange={(username) => setUsername(username.target.value)}
                />
              </FormControl>
            </Cell>

            <Cell skip={[0]} span={[4, 8, 10]}>
              <FormControl
                caption="Lowercase English letter combination"
                error={passwordInputError}
              >
                <Input
                  placeholder="Password"
                  onChange={(password) => setPassword(password.target.value)}
                />
              </FormControl>
            </Cell>

            <Cell skip={[4, 8, 8]} span={[4, 8, 10]}>
              <Button onClick={async () => await login()}> Login </Button>
            </Cell>
          </Grid>
      </Block>
    </>
  );
};

export default Login;
