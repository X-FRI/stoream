import { RingProgress, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import FileTypeDetails from "./FileTypeDetails";
import { Directory } from "../model/Directory.gen";
import React from "react";

interface FileTypesProps {
    dir: Directory
}

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
                    { value: 40, color: 'blue' },
                ]}
            />
            <FileTypeDetails dir={dir} state={fileDetailsState} setState={setFileDetailsState} />
        </>
    )
}

export default FileTypes