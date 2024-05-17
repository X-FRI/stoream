<div align="center">

# Stoream

*极简主义者的网盘系统*

</div>

- Issues: https://github.com/x-fri/stoream/issues
- Contribution: https://github.com/x-fri/stoream/pulls

| 模块           | 状态                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| stoream-engine | [![stoream-engine](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-engine.yaml) |
| stoream-webui | [![stoream-webui](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml/badge.svg)](https://github.com/X-FRI/stoream/actions/workflows/stoream-webui.yaml) |

## 开发文档

### 前端

| 语言       | 版本  |
| ---------- | ----- |
| TypeScript | 5.4.5 |
| JavaScript | ES6   |
| Rescript   | 11.1  |
    
| 工具链 | 版本          |
| ------ | ------------- |
| NodeJS | 20.13.1 (LTS) |
| Pnpm   | v9.1.1        |

| 依赖                        | 版本      |
| --------------------------- | --------- |
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
| web-vitals                  | ^2.1.     |

### 后端

| 语言  | 版本        |
| ----- | ----------- |
| Java  | 21 (LTS)    |
| Scala | 3.3.0 (LTS) |

| 工具链 | 版本   |
| ------ | ------ |
| SBT    | v1.9.9 |

| 依赖                | 版本   |
| ------------------- | ------ |
| org.scalameta.munit | 0.7.29 |

### Git 规范

- 所有 commit 消息统一由 `[模块] | ` 开头，例如对 `stoream-webui` 的更改 | `[stoream-webui] | ...`

- 本项目目前使用 `feature - dev - main` 分支模型，`main` 分支永远被保护，只能通过其他分支提交的 pr 来 merge 从而更新。`dev` 是开发分支，主要的工作集中在这个分支上，`feature` 是用于测试新的想法，新的特性的分支。

- 所有开发者在进行任何模块的开发前，硬在 issues 中打开投票，要求项目所有成员确认没有业务冲突后方可进行开发。

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