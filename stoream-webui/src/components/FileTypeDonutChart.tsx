import { DonutChart } from "@mantine/charts"
import React from "react"

import { FileTypeProportion } from "../model/FileType.gen"

interface FileTypeDonutChartProps {
    proportion: FileTypeProportion
}

const FileTypeDonutChart: React.FC<FileTypeDonutChartProps> = ({ proportion }) => {
    const fileTypeDetails = [
        { name: 'Document', value: proportion.document, color: 'indigo.6' },
        { name: 'Image', value: proportion.image, color: 'yellow.6' },
        { name: 'Video', value: proportion.video, color: 'teal.6' },
        { name: 'Audio', value: proportion.audio, color: 'blue.6' },
        { name: 'Other', value: proportion.other, color: 'gray.6' },
    ];

    return (
        <>
            <DonutChart
                data={fileTypeDetails}
                withLabelsLine
                withLabels
                chartLabel={"File Types"}
            />
        </>
    )
}

export default FileTypeDonutChart