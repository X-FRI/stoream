<div align="center">

<img src="stoream-webui/src/assets/logo.png" height="150px">

# Stoream

*Minimalist self-hosted network disk system*

</div>

- Issues: https://github.com/x-fri/stoream/issues
- Contribution: https://github.com/x-fri/stoream/pulls

<center>

| Module | Status                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebUI  | [![stoream-webui](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml)       |
| Engine | [![Test Rust project](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml) |

</center>

## Intro.

This project is mainly constructed using the following technologies:

### WebUI
- <a href="https://rescript-lang.org/"> <img src="./stoream-webui/src/assets/rescript-logo.svg" height="20px"> Rescript: Fast, Simple, Fully Typed JavaScript from the Future </a>
- <a href="https://www.typescriptlang.org/"> <img src="./stoream-webui/src/assets/typescript-logo.svg" height="20px"> Typescript: JavaScript with syntax for types. </a>
- <a href="https://react.dev/"> <img src="./stoream-webui/src/assets/react-logo.svg" height="20px"> React: The library for web and native user interfaces </a>
- <a href="https://mantine.dev/"> <img src="./stoream-webui/src/assets/mantine-logo.svg" height="20px"> Mantine: A fully featured React components library </a>

### Engine
- <a href="https://dotnet.microsoft.com/en-us/languages/fsharp"> <img src="./stoream-webui/src/assets/fsharp-logo.svg" height="20px"> F#: An open-source language that makes it easy to write succinct, robust, and performant code. </a>
- <a href="https://suave.io"> <img src="./stoream-webui/src/assets/suave-logo.png" height="20px"> Suave: A simple web development F# library providing a lightweight web server and a set of combinators to manipulate route flow and task composition. </a>


## Docs

### Developer

1. Fork this repo, then clone your forked repo
2. Develop on the __dev branch__: `git checkout -b dev`
3. Create new upstream remote: `git remote add upstream https://github.com/X-FRI`
4. Synchronize the dev branch of upstream: `git pull upstream dev`
5. Do your development
6. Push to your own repo: `git push origin dev`
7. Submit your PR to the __dev branch__

#### WebUI

For NodeJS, we recommend using [NVM](https://github.com/nvm-sh/nvm) to manage versions (If you already have a NodeJS environment, you can skip this step):

```shell
nvm install 20
```

This project is built using [pnpm](https://pnpm.io/), so:

```shell
npm install -g pnpm
```

Now you can run stoream:

```shell
pnpm dev
```

#### Engine

For .NET Core 8.0, you can use the script:

```bash
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x ./dotnet-install.sh
./dotnet-install.sh --version latest
```

or download it from the [official website](https://dotnet.microsoft.com/en-us/download).

> [!IMPORTANT]
> This project uses radical .NET Native AOT parameters and must use .NET Core 8 or above.

Now you can develop in stoream-engine directory:
- Build: `dotnet build`
- Run: `dotnet run`
- Dev: `dotnet watch`
- Publish: `dotnet publish`

> [!NOTE]
> *OPTIONAL*: In addition, we also use [UPX](https://upx.github.io/) to > optimize the size of the executable file. Most Linux distributions can > be installed through the package manager, such as on openSUSE:
> ```
> zypper in upx
> ```
> then
> ```
> upx --best --lzma ./bin/Release/net8.0/{your runtime}/publish/stoream-engine(.exe)
> ```

## [LICENSE](./LICENSE)

Copyright (c) 2024 The X-Files Research Institute

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
    * Neither the name of Stoream nor the names of its contributors
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
