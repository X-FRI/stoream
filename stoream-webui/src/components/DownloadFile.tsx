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
import { Button, List, Center, Modal } from "@mantine/core"

interface DownloadFileProps {
    file: File,
    downloadFileModalState: boolean,
    setDownloadFileModalState: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    }
}

const DownloadFile: React.FC<DownloadFileProps> = ({ file, downloadFileModalState, setDownloadFileModalState }) => {

    return (
        <>
            <Modal
                opened={downloadFileModalState}
                onClose={setDownloadFileModalState.close}
                title="Download"
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
                    <Button mt="lg" onClick={async () => {
                        const link = URL.createObjectURL(await Request.$$File.cat(file.filepath))
                        const download = document.createElement("a")
                        download.href = link
                        download.download = file.filename
                        download.click()
                        URL.revokeObjectURL(link)
                        setDownloadFileModalState.close()
                        download.remove()
                    }}> Click to download </Button>
                </Center>
            </Modal>
        </>
    )
}

export default DownloadFile;