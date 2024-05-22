import { Block } from "baseui/block";
import { Cell, Grid, ALIGNMENT } from "baseui/layout-grid";
import { HeadingLarge } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import React from "react";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameInputError, setUsernameInputError] = React.useState("");
  const [passwordInputError, setPasswordInputError] = React.useState("");

  const login = (username: string, password: string): void => {
    if (username.length == 0) setUsernameInputError("Username cannot be empty");

    if (password.length == 0) setPasswordInputError("Password cannot be empty");
  };

  return (
    <>
      <Block>
        <Card>
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
              <Button> Login </Button>
            </Cell>
          </Grid>
        </Card>
      </Block>
    </>
  );
};

export default Login;
