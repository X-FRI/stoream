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

import { User } from "../model/User"
import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameInputError, setUsernameInputError] = React.useState(false);
  const [passwordInputError, setPasswordInputError] = React.useState(false);
  const [alert, setAlert] = React.useState(<Alert variant="filled" severity="error" />)
  const [alertOpen, setAlertOpen] = React.useState(false)

  const login = async (): Promise<void> => {
    if (username.length == 0) {
      setAlert(<Alert variant="filled" severity="error">Username is empty</Alert>)
      setAlertOpen(true)
      return setUsernameInputError(true);
    }

    if (password.length == 0) {
      setAlert(<Alert variant="filled" severity="error">Password is empty</Alert>)
      setAlertOpen(true)
      return setPasswordInputError(true);
    }

    return await new User(username, password).requestLogin().then(() => {
      setAlert(<Alert variant="filled" severity="success">Login to {username}</Alert>)
      setAlertOpen(true)
    }).catch(reason => {
      setAlert(<Alert variant="filled" severity="error">{String(reason)}</Alert>)
      setAlertOpen(true)
    })
  };

  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Container>
        <Grid container spacing={2} direction="column" alignItems="center" margin={["5%", "5%", "5%", "5%"]}>
          <Grid xs marginBottom={"2%"}>
            <Typography variant="h5" component="h2">
              Log in to Stoream
            </Typography>
          </Grid>
          <Grid>
            <TextField error={usernameInputError} fullWidth id="standard-basic" label="Username" variant="standard" onChange={(username) => setUsername(username.target.value)} />
          </Grid>
          <Grid>
            <TextField error={passwordInputError} fullWidth id="standard-basic" label="Password" variant="standard" type="password" onChange={(password) => setPassword(password.target.value)} />
          </Grid>
          <Grid marginTop={"2%"}>
            <Button variant="contained" onClick={async () => await login()}>Login</Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertOpen}
        onClose={() => { setAlertOpen(false) }}
        autoHideDuration={2500}
      >
        {alert}
      </Snackbar>
    </Box>
  );
};

export default Login;
