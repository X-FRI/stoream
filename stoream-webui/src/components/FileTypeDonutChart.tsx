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

import { DonutChart } from "@mantine/charts"
import React from "react"

import { FileTypeProportion } from "../model/FileType.gen"

interface FileTypeDonutChartProps {
    proportion: FileTypeProportion
}

/** FileTypeDountChart is used to render the proportion of different file types
  * The proportion parameter is the file proportion data calculated externally. */
const FileTypeDonutChart: React.FC<FileTypeDonutChartProps> = ({ proportion }) => {
    const fileTypeDetails = [
        { name: 'Document', value: proportion.document, color: 'indigo.6' },
        { name: 'Image', value: proportion.image, color: 'yellow.6' },
        { name: 'Video', value: proportion.video, color: 'teal.6' },
        { name: 'Audio', value: proportion.audio, color: 'black.6' },
        { name: 'Other', value: proportion.other, color: 'gray.6' },
    ];

    return (
        <>
            <DonutChart
                data={fileTypeDetails}
                strokeWidth={1}
                tooltipDataSource="segment"
                withLabelsLine
                withLabels
                chartLabel={"File Types"}
            />
        </>
    )
}

export default FileTypeDonutChart