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
import { Button, Center, Input, Modal, Stack } from "@mantine/core";
import * as Request from "../model/Request.res.mjs"
import { notifications } from "@mantine/notifications";
import { fetch } from "./Files";

interface CreateDirectoryProps {
    breadcrumbs: { title: string; path: string; }[],
    setBreadcrumbs: React.Dispatch<React.SetStateAction<{
        title: string;
        path: string;
    }[]>>,
    setRenderDir: React.Dispatch<React.SetStateAction<Directory>>,
    modalState: boolean,
    setmodalState: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    }
}

const CreateDirectory: React.FC<CreateDirectoryProps> = ({ breadcrumbs, setBreadcrumbs, setRenderDir, modalState, setmodalState }) => {
    const breadcrumbsSnapshot = [...breadcrumbs]
    const [createDirectory, setCreateDirectory] = React.useState("");

    return (
        <>
            <Modal
                style={{ border: "1px solid orange" }}
                opened={modalState}
                onClose={setmodalState.close} title="Create Directory"
                yOffset="20vh"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <Center>
                    <Stack align="center" justify="center" gap="xs">
                        <Input
                            error={createDirectory === ""}
                            placeholder="Directory name"
                            style={{ width: "15em" }}
                            onChange={(value) => {
                                setCreateDirectory(value.target.value)
                            }} />

                        <Button c="dark" bg="orange" onClick={async () => {
                            await
                                Request.Directory.createdir(`${breadcrumbs[breadcrumbs.length - 1].path}/${createDirectory}`)
                                    .then(async () => {
                                        setmodalState.close()
                                        notifications.show({
                                            title: "Successful operation",
                                            message: `Create directory ${createDirectory} successfully`,
                                            color: "green"
                                        })
                                        setRenderDir(await fetch() as Directory)
                                        setBreadcrumbs(breadcrumbsSnapshot)
                                    })
                                    .catch(reason => {
                                        notifications.show({
                                            title: `An error occurred during creating directory ${createDirectory}`,
                                            message: String(reason),
                                            color: "red"
                                        })
                                    })
                        }}>
                            Confim
                        </Button>
                    </Stack>
                </Center>
            </Modal>
        </>
    )
}

export default CreateDirectory