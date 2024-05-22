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

import { Grid, Page, Spacer, useTheme } from "@geist-ui/core"
import { make as Capacity} from "../components/Capacity.res.mjs"
import { make as UserDetails} from "../components/UserDetails.res.mjs"
import Header from "../components/Header"
import Files from "../components/Files"
import FileTree from "../components/FileTree"
import { useLoaderData } from "react-router-dom"
import React from "react"

const Main = () => {
    const content = useLoaderData()
    const [explorer, setExplorer] = React.useState("tree")
    const theme = useTheme()

    return (
        <>
            <Page width="80%">
                <Grid.Container gap={1}>
                    <Grid xs> <Capacity color={theme.palette.error} /> </Grid>
                    {/* @ts-ignore */}
                    <Grid xs={5} justify="right"> <UserDetails /> </Grid>
                    <Grid xs={24}> <Header explorer={explorer} setExplorer={setExplorer} /> </Grid>
                    <Spacer h={2} />
                    <Grid.Container gap={1}>
                        <Grid xs justify="center">
                            {
                                explorer == "tree" ? <FileTree content={content} /> : <Files />
                            }
                        </Grid>
                    </Grid.Container>
                </Grid.Container>
            </Page>
        </>
    )
}

export default Main