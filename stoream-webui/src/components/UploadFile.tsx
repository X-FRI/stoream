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

import React from "react";
import { Directory } from "../model/Directory.gen";
import * as Request from "../model/Request.res.mjs";
import { notifications } from "@mantine/notifications";
import { fetch } from "./Files";
import { Box, Button, Center, Fieldset, FileInput, LoadingOverlay, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface UploadFileProps {
    breadcrumbs: { title: string; path: string; }[],
    setBreadcrumbs: React.Dispatch<React.SetStateAction<{
        title: string;
        path: string;
    }[]>>,
    setRenderDir: React.Dispatch<React.SetStateAction<Directory>>,
    modalState: boolean,
    setModalState: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    }
}

const UploadFile: React.FC<UploadFileProps> = ({ breadcrumbs, setBreadcrumbs, setRenderDir, modalState, setModalState }) => {
    const [uploadFile, setUploadFile] = React.useState<File | null>(null);
    const uploadDirectory = breadcrumbs[breadcrumbs.length - 1].path
    const breadcrumbsSnapshot = [...breadcrumbs]
    const [uploadingWaitState, setUploadingWaitState] = useDisclosure(false);

    const upload = async () => {
        const data = new FormData()
        data.append(uploadFile?.name as string, uploadFile as File)
        setUploadingWaitState.open()

        await
            Request.$$File
                .upload(uploadFile?.name, breadcrumbs[breadcrumbs.length - 1].path, data)
                .then(async () => {
                    setModalState.close()
                    notifications.show({
                        title: "Successful operation",
                        message: `Upload file ${uploadFile?.name} successfully`,
                        color: "green"
                    })
                    setRenderDir(await fetch() as Directory)
                    setBreadcrumbs(breadcrumbsSnapshot)
                })
                .then(() => setUploadingWaitState.close())
                .catch(reason => {
                    notifications.show({
                        title: `An error occurred during uploading file ${uploadFile?.name}`,
                        message: String(reason),
                        color: "red"
                    })
                })
    }

    return (
        <>
            <Modal
                style={{ border: "1px solid orange" }}
                opened={modalState}
                onClose={setModalState.close} title="Create Directory"
                yOffset="20vh"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                w={"auto"}
            >
                <LoadingOverlay visible={uploadingWaitState} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Fieldset legend="Upload File">
                    <FileInput
                        value={uploadFile}
                        onChange={setUploadFile}
                        error={uploadFile === null}
                        formEncType="multipart/form-data"
                        placeholder="Click to select file" />
                    {
                        uploadFile === null ?
                            <></> :
                            <Tooltip label={uploadDirectory}>
                                <TextInput
                                    mt={"xs"}
                                    label={"Target Directory"}
                                    placeholder={uploadDirectory}
                                    disabled />
                            </Tooltip>
                    }
                    <Center mt={"md"}>
                        <Button c="dark" bg="orange" onClick={async () => await upload()}> Confim </Button>
                    </Center>
                </Fieldset>
            </Modal >
        </>
    )
}

export default UploadFile