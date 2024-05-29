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

import * as Request from "../model/Request.res.mjs"
import React from "react"
import { Button, List, Center, Modal } from "@mantine/core"
import { IconDownload } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"
import { Directory } from "../model/Directory.gen"
import { fetch } from "./Files"
import { stringOfDirectorySize } from "../model/Directory.res.mjs"

interface DeleteDirectoryProps {
    dir: Directory,
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

const DeleteDirectory: React.FC<DeleteDirectoryProps> = ({ dir, modalState, setModalState, breadcrumbs, setBreadcrumbs, setRenderDir }) => {
    const breadcrumbsSnapshot = breadcrumbs.slice(0, -1)
    return (
        <>
            <Modal
                style={{ border: "1px solid orange" }}
                opened={modalState}
                onClose={setModalState.close}
                title="Delete Directory"
                size={"auto"}
                yOffset={"20%"}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}>
                <List>
                    <List.Item>Directory name: {dir.name}</List.Item>
                    <List.Item>Directory path: {dir.path}</List.Item>
                    <List.Item>Directory size: {stringOfDirectorySize(dir.size)}</List.Item>
                </List>
                <Center>
                    <Button c="dark" bg="orange" mt="lg" leftSection={<IconDownload size={"1em"} />} onClick={async () => {
                        await
                            Request.Directory.deletedir(dir.path)
                                .then(async () => {
                                    setModalState.close()
                                    notifications.show({
                                        title: "Successful operation",
                                        message: `Delete directory ${dir.name} successfully`,
                                        color: "green"
                                    })
                                    setRenderDir(await fetch() as Directory)
                                    setBreadcrumbs(breadcrumbsSnapshot)
                                })
                                .catch(reason => {
                                    notifications.show({
                                        title: `An error occurred during deleting directory ${dir.name}`,
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

export default DeleteDirectory;