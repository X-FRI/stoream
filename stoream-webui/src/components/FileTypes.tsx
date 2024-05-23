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

import { RingProgress, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import FileTypeDetails from "./FileTypeDetails";
import { Directory } from "../model/Directory.gen";
import React from "react";

interface FileTypesProps {
    dir: Directory
}

/** FileTypes itself does not render information about file types,
  * but rather renders the ratio of total file size to free space.
  * However, it can be clicked to display a Drawer to display
  * detailed information about file types. 
  * 
  * TODO: This component is not yet complete */
const FileTypes: React.FC<FileTypesProps> = ({ dir }) => {
    const [fileDetailsState, setFileDetailsState] = useDisclosure(false);

    return (
        <>
            <RingProgress
                onClick={() => setFileDetailsState.open()}
                size={100}
                thickness={5}
                roundCaps
                label={
                    <Text c="black" fw={700} ta="center" size="xl">
                        40%
                    </Text>
                }
                sections={[
                    { value: 40, color: 'black' },
                ]}
            />
            <FileTypeDetails dir={dir} state={fileDetailsState} setState={setFileDetailsState} />
        </>
    )
}

export default FileTypes