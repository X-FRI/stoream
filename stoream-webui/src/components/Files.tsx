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

import { Card, Container, Group, Menu, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import * as Request from "../model/Request.res.mjs"
import { slice, stringOfDirectorySize } from "../model/Directory.res.mjs"
import { stringOfFileSize } from "../model/File.res.mjs"
import { Directory } from "../model/Directory.gen"
import DownloadFile from "./DownloadFile.tsx"
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import Operations from "./Operations.tsx";
import { IconFile, IconFileDownload, IconFileMinus, IconFolder, IconMinus } from "@tabler/icons-react";
import DeleteFile from "./DeleteFile.tsx";

/** Before loading the Files component, its need to request the directory tree
  * under the path specified by the configuration file from the engine.
  * This function will be called by react-router-dom in the loader.
  * The return value can be obtained through useLoaderData. */
export const fetch = async (): Promise<Directory | void> => {
    return await Request.Directory.tree().catch(reason => {
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

/** Files is a file list view component used to display the contents of dir
  * dir is passed in from the outside. This value is usually the return value of fetch.
  * 
  * TODO: ContextMenu is not implemented yet */
const Files: React.FC<FilesProps> = ({ dir }) => {
    const [renderDir, setRenderDir] = React.useState(dir)

    /* Breadcrumbs is used to display the path of the current file list
     * and is bound to the rendering function of the file list.
     * If breadcrumbs is updated, it will cause the file list to re-render the content in the new path. */
    const DEFAULT_BREADCRUMBS = [{ title: renderDir.name, path: renderDir.path }]
    const [breadcrumbs, setBreadcrumbs] = React.useState(DEFAULT_BREADCRUMBS)

    /* When a file in the list is clicked, a Modal will pop up to confirm the download, 
     * and its state is controlled by downloadFileModalState. */
    const [downloadFileModalState, setDownloadFileModalState] = useDisclosure(false);
    const [downloadFile, setDownloadFile] = React.useState({ filename: "", filepath: "", filesize: 0 })

    const [deleteFileModalState, setDeleteFileModalState] = useDisclosure(false);
    const [deleteFile, setDeleteFile] = React.useState({ filename: "", filepath: "", filesize: 0 })

    const realtimeDir: Directory = (() => {
        if (breadcrumbs.length == 1)
            return renderDir
        else return slice(renderDir, breadcrumbs[breadcrumbs.length - 1].path.split(renderDir.path)[1])
    })()

    /* Used to update breadcrumbs.
     * Clicking the path in breadcrumbs should call this function to update.
     * This function will recalculate the path in breadcrumbs. 
     * 
     * Note: Please do not call setBreadcrumbs directly */
    const updateBreadcrumbs = (path: string) => {
        const titles = path
            .split(renderDir.path)[1]
            .split("/")
            .slice(1);

        const newBreadcrumbs =
            DEFAULT_BREADCRUMBS
                .concat(titles.map((title, index) => {
                    return { title: title, path: renderDir.path + titles.slice(0, index + 1).join("/") }
                }))

        newBreadcrumbs[newBreadcrumbs.length - 1] = { title: titles[titles.length - 1], path: path }
        setBreadcrumbs(newBreadcrumbs)
    }

    /* Used to render the content in the path 
     * pointed to by the last (i.e. latest) value of breadcrumbs. */
    const render = () => {
        return realtimeDir.sub.map(dir =>
            <Table.Tr key={dir.name}
                style={{ cursor: "pointer" }}
                onClick={() => updateBreadcrumbs(dir.path)}>
                <Table.Td>
                    <Group justify="flex-start">
                        <IconFolder size={"1em"} color="green" />
                        <Text fz="sm" lh="xs">{dir.name}</Text>
                    </Group>
                </Table.Td>
                <Table.Td c={"indigo"}>{dir.files.length}</Table.Td>
                <Table.Td c={"blue"}>{stringOfDirectorySize(dir.size)}</Table.Td>
            </Table.Tr>
        ).concat(realtimeDir.files.map(file =>
            <Table.Tr style={{ cursor: "pointer" }} key={file.filename}>
                <Menu shadow="lg">
                    <Menu.Target>
                        <Table.Td>
                            <Group justify="flex-start">
                                <IconFile size={"1em"} color="grey" />
                                <Text fz="sm" lh="xs" >{file.filename}</Text>
                            </Group>
                        </Table.Td>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconFileMinus size="1em" color="cyan" />} onClick={() => {
                            setDeleteFile(file)
                            setDeleteFileModalState.open()
                        }}>
                            <Text fz="sm" lh="xs">Delete</Text>
                        </Menu.Item>

                        <Menu.Item leftSection={<IconFileDownload size="1em" color="cyan"  />} onClick={() => {
                            setDownloadFile(file)
                            setDownloadFileModalState.open()
                        }}>
                            <Text fz="sm" lh="xs">Download</Text>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <Table.Td>
                    <IconMinus />
                </Table.Td>
                <Table.Td c={"blue"}>{stringOfFileSize(file.filesize)}</Table.Td>
            </Table.Tr>
        ))
    }

    return (
        <Container>
            <Card shadow="lg" style={{border: "1px solid orange"}}>
                <Stack>
                    <Group justify="space-between">
                        <Breadcrumbs>{
                            breadcrumbs.map((item, index) => (
                                <Anchor key={index} onClick={() => {
                                    if (item.path === renderDir.path) setBreadcrumbs(DEFAULT_BREADCRUMBS)
                                    else {
                                        updateBreadcrumbs(item.path)
                                    }
                                }}>
                                    {item.title}
                                </Anchor>
                            ))
                        }</Breadcrumbs>
                        <Operations breadcrumbs={breadcrumbs} setBreadcrumbs={setBreadcrumbs} setRenderDir={setRenderDir} realtimeDir={realtimeDir} />
                    </Group>
                    <ScrollArea h={500}>
                        <Table captionSide="bottom" highlightOnHover>
                            <Table.Caption>Files in {breadcrumbs[breadcrumbs.length - 1].path}</Table.Caption>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Files</Table.Th>
                                    <Table.Th>Size</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {render()}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Stack>
            </Card>
            <DownloadFile setModalState={setDownloadFileModalState} modalState={downloadFileModalState} file={downloadFile} />
            <DeleteFile
                setModalState={setDeleteFileModalState}
                modalState={deleteFileModalState}
                file={deleteFile}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
                setRenderDir={setRenderDir}
            />
        </Container>
    )
}

export default Files;