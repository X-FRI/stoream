<div align="center">

# Stoream

*极简主义者的网盘系统*

</div>

- Issues: https://github.com/x-fri/stoream/issues
- Contribution: https://github.com/x-fri/stoream/pulls

  | 模块           | 状态                                                                                                                                                                          |
  | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | stoream-engine | [![stoream-engine](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml) |
  | stoream-webui  | [![stoream-webui](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml)    |

## 开发文档


| 语言       | 版本  |
| ---------- | ----- |
| TypeScript | 5.4.5 |
| JavaScript | ES6   |
| Rescript   | 11.1  |
    
| 工具链 | 版本          |
| ------ | ------------- |
| NodeJS | 20.13.1 (LTS) |
| Pnpm   | v9.1.1        |

对于 NodeJS，在 *nix 操作系统上推荐使用 [NVM](https://github.com/nvm-sh/nvm) 管理版本:
> NVM: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions 

```shell
# 使用 curl 安装：

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 或 wget:

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

然后安装 NodeJS 20.13.1:

```shell
nvm install 20
```

再通过 npm 安装 pnpm:

```shell
# 可选，换源: npm config set registry https://registry.npmmirror.com
npm install -g pnpm
# 可选，换源: pnpm config set registry https://registry.npmmirror.com
```

至此，`stoream-webui` 开发工具链已经配置完成，可以进入 `stoream-webui` 目录并执行 `pnpm install && pnpm dev` 进行开发。

#### 依赖信息

| 依赖                        | 版本      |
| --------------------------- | --------- |
| @geist-ui/core              | ^2.3.8    |
| @geist-ui/icons 	      | ^1.0.2    |
| @testing-library/jest-dom   | ^5.17.0   |
| @testing-library/react      | ^13.4.0   |
| @testing-library/user-event | ^13.5.0   |
| @types/jest                 | ^27.5.2   |
| @types/node                 | ^16.18.97 |
| @types/react                | ^18.3.2   |
| @types/react-dom            | ^18.3.0   |
| react                       | ^18.3.1   |
| react-dom                   | ^18.3.1   |
| react-scripts               | "5.0.1    |
| typescript                  | ^4.9.5    |

### 后端

| 语言  | 版本        |
| ----- | ----------- |
| Java  | 21 (LTS)    |
| Scala | 3.3.0 (LTS) |

| 工具链 | 版本   |
| ------ | ------ |
| SBT    | v1.9.9 |

对于 Java 21，这里推荐使用 GraalVM，如果你已经有 Java 21 的环境，可以忽略此步骤:

```shell
# 通过 wget 下载
wget https://download.oracle.com/graalvm/21/latest/graalvm-jdk-21_linux-x64_bin.tar.gz

# 或 通过 curl
curl https://download.oracle.com/graalvm/21/latest/graalvm-jdk-21_linux-x64_bin.tar.gz

# 其他操作系统用户可访问: https://www.graalvm.org/downloads/#
```

本项目后端使用 Java + Scala 混合开发并使用 [sbt](https://www.scala-sbt.org/) 进行构建，可以通过 [coursier](https://get-coursier.io/docs/cli-installation) 一次性安装好环境:

```shell
# 在 Linux 上：
curl -fL "https://github.com/coursier/launchers/raw/master/cs-x86_64-pc-linux.gz" | gzip -d > cs

# 在 Windows 上 (Powershell)：
Invoke-WebRequest -Uri "https://github.com/coursier/launchers/raw/master/cs-x86_64-pc-win32.zip" -OutFile "cs-x86_64-pc-win32.zip"
Expand-Archive -Path "cs-x86_64-pc-win32.zip" -DestinationPath .
Rename-Item -Path "cs-x86_64-pc-win32.exe" -NewName "cs.exe"
Remove-Item -Path "cs-x86_64-pc-win32.zip"
.\cs setup

# 在 Windows 上 (CMD):
curl -fLo cs-x86_64-pc-win32.zip https://github.com/coursier/launchers/raw/master/cs-x86_64-pc-win32.zip
tar -xf cs-x86_64-pc-win32.zip
move cs-x86_64-pc-win32.exe cs.exe
.\cs setup
```

至此，`stoream-engine` 开发工具链已经配置完成，可以进入 `stoream-engine` 目录执行 `sbt` 进行开发。

#### 依赖信息

| 依赖                | 版本   |
| ------------------- | ------ |
| org.scalameta.munit | 0.7.29 |

### Git 规范

- 所有 commit 消息统一由 `[模块]: ` 开头，例如对 `stoream-webui` 的更改 | `[stoream-webui]: ...`

- 本项目目前使用 `feature - dev - main` 分支模型，`main` 分支永远被保护，只能通过其他分支提交的 pr 来 merge 从而更新。`dev` 是开发分支，主要的工作集中在这个分支上，`feature` 是用于测试新的想法，新的特性的分支。

- 所有开发者在进行任何模块的开发前，应在 issues 中打开投票，要求项目所有成员确认没有业务冲突后方可进行开发。

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
