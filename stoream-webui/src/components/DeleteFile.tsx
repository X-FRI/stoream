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

import { File } from "../model/File.gen"
import { stringOfFileSize } from "../model/File.res.mjs"
import * as Request from "../model/Request.res.mjs"
import React from "react"
import { Button, List, Center, Modal, rem } from "@mantine/core"
import { IconDownload } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"
import { Directory } from "../model/Directory.gen"
import { fetch } from "./Files"

interface DeleteFileProps {
    file: File,
    modalState: boolean,
    setModalState: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    },
    breadcrumbs: { title: string; path: string; }[],
    setBreadcrumbs: React.Dispatch<React.SetStateAction<{
        title: string;
        path: string;
    }[]>>,
    setRenderDir: React.Dispatch<React.SetStateAction<Directory>>,
}

const DeleteFile: React.FC<DeleteFileProps> = ({ file, modalState, setModalState, breadcrumbs, setBreadcrumbs, setRenderDir }) => {
    const breadcrumbsSnapshot = [...breadcrumbs]
    return (
        <>
            <Modal
                style={{ border: "1px solid orange" }}
                opened={modalState}
                onClose={setModalState.close}
                title="Delete File"
                size={"auto"}
                yOffset={"20%"}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}>
                <List>
                    <List.Item>File name: {file.filename}</List.Item>
                    <List.Item>File path: {file.filepath}</List.Item>
                    <List.Item>File size: {stringOfFileSize(file.filesize)}</List.Item>
                </List>
                <Center>
                    <Button c="dark" bg="orange" mt="lg" leftSection={<IconDownload size={"1em"} />} onClick={async () => {
                        await
                            Request.$$File
                                .deletefile(file.filepath)
                                .then(async () => {
                                    setModalState.close()
                                    notifications.show({
                                        title: "Successful operation",
                                        message: `Delete file ${file.filename} successfully`,
                                        color: "green"
                                    })
                                    setRenderDir(await fetch() as Directory)
                                    setBreadcrumbs(breadcrumbsSnapshot)
                                })
                                .catch(reason => {
                                    notifications.show({
                                        title: `An error occurred during deleting file ${file.filename}`,
                                        message: String(reason),
                                        color: "red"
                                    })
                                })
                    }}> Confim </Button>
                </Center>
            </Modal>
        </>
    )
}

export default DeleteFile;