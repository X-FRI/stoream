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

import { Button, Container, Group, rem } from "@mantine/core"
import { SearchIcon } from "./Icons";
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { flatFile } from "../model/Directory.res.mjs";
import { useLoaderData } from "react-router-dom";
import { File } from "../model/File.gen";
import React from "react";
import { stringOfFileSize } from "../model/File.res.mjs";

/** Operations is a series of operation components under the 
  * Header component on the homepage, such as uploading files, 
  * searching for files, etc.
  * 
  * TODO: This component is not yet complete */
const Operations = () => {
    const files: File[] = flatFile(useLoaderData())
    const [queryFilename, setQueryFilename] = React.useState('');

    const items: SpotlightActionData[] =
        files
            .filter((file: File) => file.filename.includes(queryFilename.toLowerCase().trim()))
            .map((file: File) => ({ id: file.filename, label: file.filepath, description: stringOfFileSize(file.filesize) }));

    return (
        <Container>
            <Group justify="flex-start">
                <Button bg="black" style={{boxShadow: "1px 1px 3px black"}}> Upload </Button>
                <Button bg="black" style={{boxShadow: "1px 1px 3px black"}}> Create </Button>
                <Button bg="black" style={{boxShadow: "1px 1px 3px black"}} onClick={spotlight.open}>Search</Button>
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
                        leftSection: <SearchIcon style={{ width: rem(20), height: rem(20) }} stroke={"1.5"} />,
                        placeholder: 'Search files...',
                    }}
                />
            </Group>
        </Container>
    )
}

export default Operations;