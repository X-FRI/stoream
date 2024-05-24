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

import { Button, Card, Center, Container, List, ListItem, Modal, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import * as Request from "../model/Request.res.mjs"
import { slice, stringOfDirectorySize } from "../model/Directory.res.mjs"
import { stringOfFileSize } from "../model/File.res.mjs"
import { Directory } from "../model/Directory.gen"
import { nonExistentFile } from "../model/File.res.mjs";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

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
  * dir is passed in from the outside. This value is usually the return value of fetch. */
const Files: React.FC<FilesProps> = ({ dir }) => {
    /* Breadcrumbs is used to display the path of the current file list
     * and is bound to the rendering function of the file list.
     * If breadcrumbs is updated, it will cause the file list to re-render the content in the new path. */
    const DEFAULT_BREADCRUMBS = [{ title: dir.name, path: dir.path }]
    const [breadcrumbs, setBreadcrumbs] = React.useState(DEFAULT_BREADCRUMBS)

    /* When a file in the list is clicked, a Modal will pop up to confirm the download, 
     * and its state is controlled by downloadFileModalState. */
    const [downloadFileModalState, setDownloadFileModalState] = useDisclosure(false);
    const [downloadFile, setDownloadFile] = React.useState(nonExistentFile)

    /* Used to update breadcrumbs.
     * Clicking the path in breadcrumbs should call this function to update.
     * This function will recalculate the path in breadcrumbs. 
     * 
     * Note: Please do not call setBreadcrumbs directly */
    const updateBreadcrumbs = (path: string) => {
        const titles = path
            .split(dir.path)[1]
            .split("/")
            .slice(1);

        const newBreadcrumbs =
            DEFAULT_BREADCRUMBS
                .concat(titles.map((title, index) => {
                    return { title: title, path: dir.path + titles.slice(0, index + 1).join("/") }
                }
                )
                )

        newBreadcrumbs[newBreadcrumbs.length - 1] = { title: titles[titles.length - 1], path: path }
        setBreadcrumbs(newBreadcrumbs)
    }

    /* Used to render the content in the path 
     * pointed to by the last (i.e. latest) value of breadcrumbs. */
    const render = () => {
        const realtimeDir: Directory = (() => {
            if (breadcrumbs.length == 1)
                return dir
            else return slice(dir, breadcrumbs[breadcrumbs.length - 1].path.split(dir.path)[1])
        })()

        return realtimeDir.sub.map(dir =>
            <Table.Tr key={dir.name} style={{ cursor: "pointer" }} onClick={() => {
                updateBreadcrumbs(dir.path)
            }}>
                <Table.Td><Text fz="sm" lh="xs" c="blue">{dir.name}</Text></Table.Td>
                <Table.Td>{dir.files.length}</Table.Td>
                <Table.Td>{stringOfDirectorySize(dir.size)}</Table.Td>
            </Table.Tr>
        ).concat(realtimeDir.files.map(file =>
            <Table.Tr style={{ cursor: "pointer" }} key={file.filename} onClick={async () => {
                setDownloadFile(file)
                setDownloadFileModalState.open()
            }}>
                <Table.Td><Text fz="sm" lh="xs" c="black">{file.filename}</Text></Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>{stringOfFileSize(file.filesize)}</Table.Td>
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
                                if (item.path === dir.path) setBreadcrumbs(DEFAULT_BREADCRUMBS)
                                else {
                                    updateBreadcrumbs(item.path)
                                }
                            }}>
                                {item.title}
                            </Anchor>
                        ))
                    }</Breadcrumbs>
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
                            <Table.Tfoot>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Files</Table.Th>
                                    <Table.Th>Size</Table.Th>
                                </Table.Tr>
                            </Table.Tfoot>
                        </Table>
                    </ScrollArea>
                </Stack>
            </Card>

            <Modal opened={downloadFileModalState} onClose={setDownloadFileModalState.close} title="Download">
                <List>
                    <List.Item>File name: {downloadFile.filename}</List.Item>
                    <List.Item>File path: {downloadFile.filepath}</List.Item>
                    <List.Item>File size: {stringOfFileSize(downloadFile.filesize)}</List.Item>
                </List>
                <Center>
                    <Button mt="lg" onClick={async () => {
                        const link = URL.createObjectURL(await Request.$$File.cat(downloadFile.filepath))
                        const download = document.createElement("a")
                        download.href = link
                        download.download = downloadFile.filename
                        download.click()
                        URL.revokeObjectURL(link)
                        setDownloadFileModalState.close()
                    }}> Click to download </Button>
                </Center>
            </Modal>
        </Container>
    )
}

export default Files;