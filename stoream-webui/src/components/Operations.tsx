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

import { Button, Menu, rem } from "@mantine/core"
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { flatFile } from "../model/Directory.res.mjs";
import { useLoaderData } from "react-router-dom";
import { File as $$File } from "../model/File.gen";
import React from "react";
import DownloadFile from "./DownloadFile";
import { stringOfFileSize } from "../model/File.res.mjs";
import { LoaderData } from "../model/LoaderData.gen";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload, IconFolderPlus, IconSearch } from '@tabler/icons-react';
import { Directory } from "../model/Directory.gen";
import UploadFile from "./UploadFile";
import CreateDirectory from "./CreateDirectory";

interface OperationsProps {
    breadcrumbs: { title: string; path: string; }[],
    setBreadcrumbs: React.Dispatch<React.SetStateAction<{
        title: string;
        path: string;
    }[]>>,
    setRenderDir: React.Dispatch<React.SetStateAction<Directory>>
}


/** Operations is a series of operation components under the 
  * Header component on the homepage, such as uploading files, 
  * searching for files, etc.
  * 
  * TODO: This component is not yet complete */
const Operations: React.FC<OperationsProps> = ({ breadcrumbs, setBreadcrumbs, setRenderDir }) => {
    const loaderData = useLoaderData() as LoaderData;
    const files: $$File[] = flatFile(loaderData.dir)
    const [queryFilename, setQueryFilename] = React.useState('');

    const [createDirectoryModalStatus, setCreateDirectoryModalStatus] = useDisclosure(false);
    const [downloadFileModalState, setDownloadFileModalState] = useDisclosure(false);
    const [uploadFileModalState, setUploadFileModalState] = useDisclosure(false);

    const [downloadFile, setDownloadFile] = React.useState({ filename: "", filepath: "", filesize: 0 })

    const items: SpotlightActionData[] =
        files
            .filter((file: $$File) => file.filename.includes(queryFilename.toLowerCase().trim()))
            .map((file: $$File) => ({
                id: file.filename,
                label: file.filepath,
                description: stringOfFileSize(file.filesize),
                onClick: () => {
                    setDownloadFile(file)
                    setDownloadFileModalState.open()
                }
            }));

    return (
        <>
            <Menu shadow="md">
                <Menu.Target>
                    <Button> Operations </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        onClick={setCreateDirectoryModalStatus.open}
                        leftSection={<IconFolderPlus style={{ width: rem(14), height: rem(14) }} />}
                    >
                        Create Directory
                    </Menu.Item>
                    <Menu.Item
                        onClick={setUploadFileModalState.open}
                        leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                    >
                        Upload File
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />} onClick={spotlight.open}>
                        Search File
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <CreateDirectory
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
                createDirectoryModalStatus={createDirectoryModalStatus}
                setCreateDirectoryModalStatus={setCreateDirectoryModalStatus}
                setRenderDir={setRenderDir} />

            <UploadFile
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
                setUploadFileModalStatus={setUploadFileModalState}
                uploadFileModalStatus={uploadFileModalState}
                setRenderDir={setRenderDir} />

            <Spotlight
                actions={items}
                shadow="lg"
                nothingFound="Nothing found..."
                highlightQuery
                scrollable
                query={queryFilename}
                onQueryChange={setQueryFilename}
                limit={7}
                searchProps={{
                    leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={"1.5"} />,
                    placeholder: 'Search files...',
                }}
            />
            <DownloadFile setDownloadFileModalState={setDownloadFileModalState} downloadFileModalState={downloadFileModalState} file={downloadFile} />
        </>
    )
}

export default Operations;