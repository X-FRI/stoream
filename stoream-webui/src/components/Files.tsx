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

import { Breadcrumbs, Card, Grid, Pagination, Table, Text } from "@geist-ui/core"
import React from "react"
import { useLoaderData } from "react-router-dom"

const render = (content, setPath) => {
    return content.sub.map(dir => {
        return {
            name: <p onClick={() => setPath(renderPath(dir))}> {dir.name}</p>,
            size: dir.size
        }

    }).concat(
        content.files.map(file => {
            return {
                name: <p> {file.filename}</p>,
                size: file.filesize
            }
        })
    )
}

const renderPath = (content) => {
    return (
        <>
            <Breadcrumbs>
                {
                    content.path.split("/").map(path => <Breadcrumbs.Item>{path}</Breadcrumbs.Item>)
                }
            </Breadcrumbs>
        </>
    )
}

const Files = () => {
    const content = useLoaderData()
    const [path, setPath] = React.useState(renderPath(content))
    const [files, setFiles] = React.useState(render(content, setPath))

    /**
     * <Grid.Container gap={1}>
                    <Grid xs={24}>
                        <Breadcrumbs>
                            {path}
                        </Breadcrumbs>
                    </Grid>
                    <Grid xs={24}>
                        <Table hover data={files}>
                            <Table.Column prop="name" label="name" />
                            <Table.Column prop="size" label="size" />
                        </Table>
                    </Grid>
                    <Grid xs={24} justify='center'>
                        <Pagination count={20} initialPage={1} />
                    </Grid>
                </Grid.Container>
     */

    return (
        <>
            <Card shadow type="error">
                <Text h1>
                    List views are not currently supported
                </Text>
            </Card>
        </>
    )
}

export default Files;