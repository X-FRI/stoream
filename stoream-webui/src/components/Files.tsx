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

import { Card, Container, ScrollArea, Stack, Table } from "@mantine/core";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import * as Request from "../model/Request.res.mjs"
import { slice } from "../model/Directory.res.mjs"
import { Directory } from "../model/Directory.gen"
import React from "react";

export const fetch = async (): Promise<Directory | void> => {
    return await Request.Directory.request("/home/muqiu/Documents/Note").catch(reason => {
        notifications.show({
            title: "An error occurred during get the files from engine",
            message: String(reason),
            color: "red"
        })
    })
}

interface FilesProps {
    dir: Directory
}

const Files: React.FC<FilesProps> = ({ dir }) => {
    const DEFAULT_BREADCRUMBS = [{ title: 'Note', path: "/home/muqiu/Documents/Note" }]
    const [breadcrumbs, setBreadcrumbs] = React.useState(DEFAULT_BREADCRUMBS)

    const updateBreadcrumbs = (path: string) => {
        setBreadcrumbs(
            DEFAULT_BREADCRUMBS
                .concat(path
                    .split("/home/muqiu/Documents/Note")[1]
                    .split("/")
                    .slice(1)
                    .map(title => ({ title: title, path: path }))))
    }

    const render = () => {
        const realtimeDir: Directory = (() => {
            if (breadcrumbs.length == 1)
                return dir
            else return slice(dir, breadcrumbs[1].path.split("/home/muqiu/Documents/Note")[1])
        })()

        return realtimeDir.sub.map(dir =>
            <Table.Tr key={dir.name} style={{ cursor: "pointer" }} onClick={() => {
                updateBreadcrumbs(dir.path)
            }}>
                <Table.Td>{dir.name}</Table.Td>
                <Table.Td>{dir.files.length}</Table.Td>
                <Table.Td>{(dir.size / 1024).toFixed()}</Table.Td>
            </Table.Tr>
        ).concat(realtimeDir.files.map(file =>
            <Table.Tr style={{ cursor: "pointer" }} key={file.filename}>
                <Table.Td>{file.filename}</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>{(file.filesize / 1024).toFixed()}</Table.Td>
            </Table.Tr>
        ))
    }

    return (
        <Container>
            <Card shadow="lg" withBorder>
                <Stack>
                    <Breadcrumbs>{
                        breadcrumbs.map((item, index) => (
                            <Anchor key={index} onClick={() => {
                                if (item.path === "/home/muqiu/Documents/Note") setBreadcrumbs(DEFAULT_BREADCRUMBS)
                                else {
                                    console.log(item)
                                    updateBreadcrumbs(item.path)
                                    console.log(breadcrumbs)
                                }
                            }}>
                                {item.title}
                            </Anchor>
                        ))
                    }</Breadcrumbs>
                    <ScrollArea h={500}>
                        <Table captionSide="bottom" highlightOnHover>
                            <Table.Caption>Files in {"/home/muqiu/Documents/Note"}</Table.Caption>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Files</Table.Th>
                                    <Table.Th>Size (KB)</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {render()}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Stack>
            </Card>
        </Container>
    )
}

export default Files;