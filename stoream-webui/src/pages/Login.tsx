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

import * as Request from "../model/Request.res.mjs"
import React from "react";
import { Stack, Input, Button, Title, Card, Space } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (): Promise<void> => {
    return await Request.User.request({ username, password }).then(() => {
      localStorage.setItem("isLogin", "true")

      notifications.show({
        title: "login successful",
        message: "Successfully logged in to user " + username,
        color: "green"
      })

      navigate("/files")
    }).catch(reason => {
      console.log(reason.stack)
      notifications.show({
        title: "An error occurred during login",
        message: String(reason),
        color: "red"
      })
    })
  };

  return (
    <Stack align="center" justify="center" gap="xl">
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />

      <Card shadow="lg" padding="lg" radius="md" style={{ width: "20em", border: "1px solid orange" }} c="blue">
        <Stack style={{ margin: "10% 10% 10% 10%" }} align="center" justify="center" gap="xl">
          <Title order={2}>Login to Stoream</Title>

          <Input
            error={username === ""}
            placeholder="Username"
            style={{ width: "15em" }}
            onChange={(value) => setUsername(value.target.value)}
          />

          <Input
            error={password === ""}
            placeholder="Password" type="password"
            style={{ width: "15em" }}
            onChange={(value) => setPassword(value.target.value)}
          />

          <Button onClick={async () => await login()} bg="orange" c="dark"> Login </Button>
        </Stack>
      </Card>

    </Stack>
  );
};

export default Login;
