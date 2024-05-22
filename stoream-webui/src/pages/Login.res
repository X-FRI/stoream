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

open BaseWeb

@react.component
let make = () => {
  let (username, setUsername) = React.useState(() => "")
  let (password, setPassword) = React.useState(() => "")
  let (usernameError, setUsernameError) = React.useState(() => "")
  let (passwordError, setPasswordError) = React.useState(() => "")

  <Block marginTop="20%">
    <Grid>
      <Cell skip={[0]} span={[4, 8, 12]}>
        <h1> {"Login to stoream"->React.string} </h1>
      </Cell>
      <Cell skip={[0]} span={[4, 8, 12]}>
        <FormControl error={usernameError} caption={"Username must be pure English letters"}>
          <Input
            placeholder="Username"
            clearable=true
            clearOnEscape=true
            onChange={changedUsername => {
              setUsername(changedUsername)

              if username->String.length != 0 {
                setUsernameError(_ => "")
              }
            }}
          />
        </FormControl>
      </Cell>
      <Cell skip={[0]} span={[4, 8, 12]}>
        <FormControl error={passwordError} caption={"Password must be pure English letters"}>
          <Input
            placeholder="Password"
            clearable=true
            clearOnEscape=true
            _type="password"
            onChange={changedPassword => {
              setPassword(changedPassword)

              if password->String.length != 0 {
                setPasswordError(_ => "")
              }
            }}
          />
        </FormControl>
      </Cell>
      <Cell skip={[4, 8, 12]} span={[4, 8, 12]}>
        <Button
          onClick={() => {
            if username->String.length == 0 {
              setUsernameError(_ => "Username can not be empty!")
            }

            if password->String.length == 0 {
              setPasswordError(_ => "Password can not be empty!")
            }
          }}>
          {"Login"->React.string}
        </Button>
      </Cell>
    </Grid>
  </Block>
}
