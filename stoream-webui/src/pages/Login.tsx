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
import { Card, Center, PinInput, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [pinErrorState, setPinErrorState] = React.useState(false);

  const login = async (pin: string): Promise<void> => {
    return await Request.Pin.request(pin).then(() => {
      localStorage.setItem("isLogin", "true")

      notifications.show({
        title: "login successful",
        message: "Successfully logged",
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
      setPinErrorState(true)
    })
  };

  return (
    <Stack
      align="center"
      justify="center"
      ml={"1em"}
      mr={"1em"}
      h={"100vh"}
    >
      <Text fz={"h3"}> Please enter your PIN </Text>
      <Card shadow="lg" radius="md" style={{ border: "1px solid orange" }} c="blue">
        <Center>
          <PinInput error={pinErrorState} size={"xs"} length={6} onChange={async (value) => {
            setPinErrorState(false)
            if (value.length === 6) {
              await login(value)
            }
          }} />
        </Center>
      </Card>
    </Stack>
  );
};

export default Login;
