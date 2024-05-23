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

import { Sparkline } from "@mantine/charts"
import { Center, Container, Divider, Drawer, Grid, GridCol, Text } from "@mantine/core"
import React from "react";
import FileTypeDonutChart from "./FileTypeDonutChart";
import { Directory } from "../model/Directory.gen";
import { calculateFileTypeProportion } from "../model/Directory.res.mjs"

interface FileTypeDetailsProps {
    state: boolean;
    setState: {
        readonly open: () => void;
        readonly close: () => void;
        readonly toggle: () => void;
    };
    dir: Directory
}

const FileTypeDetails: React.FC<FileTypeDetailsProps> = ({ state, setState, dir }) => {
    const proportion = calculateFileTypeProportion(dir)

    return (
        <Container>
            <Drawer
                opened={state}
                onClose={setState.close}
                offset={8}
                title="Details"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                radius={"md"}
            >
                <Grid justify="center">
                    <GridCol span={12}>
                        <Center>
                            <FileTypeDonutChart proportion={proportion} />
                        </Center>
                    </GridCol>
                    <GridCol span={12}>
                        <Center>
                            <Sparkline
                                w={"100%"}
                                h={"10em"}
                                data={[10, 20, 40, 20, 40, 10, 50]}
                                curveType="natural"
                                color="blue"
                                fillOpacity={0.6}
                                strokeWidth={2}
                            />
                        </Center>
                        <Divider my="md" />
                        <GridCol span={12}>
                            <Center>
                                <Text>Capacity Trends</Text>
                            </Center>
                        </GridCol>
                    </GridCol>
                </Grid>
            </Drawer>
        </Container>
    )
}

export default FileTypeDetails