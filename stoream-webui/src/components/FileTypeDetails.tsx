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
    let proportion = calculateFileTypeProportion(undefined, dir)

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