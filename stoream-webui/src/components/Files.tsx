import { Card, Container, Stack, Table } from "@mantine/core";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import * as Request from "../model/Request.res.mjs"
import "../model/File.gen"
import { Directory } from "../model/Directory.gen"

const items = [
    { title: '/home', href: '#' },
    { title: 'muqiu', href: '#' },
    { title: 'Documents', href: '#' },
    { title: 'Notes', href: '#' },
].map((item, index) => (
    <Anchor key={index} onClick={() => { console.log(item.title) }}>
        {item.title}
    </Anchor>
));

const testfiles = [
    { filename: "Real World OCaml", size: 1 },
];

const Files = () => {
    const directory = async (): Promise<Directory | void> => {
        await Request.Directory.request("http://localhost:9993/files?path=/home/muqiu/Documents/Notes").then((file: Directory) => {
            return file
        }).catch(reason => {
            return notifications.show({
                title: "An error occurred during get the files from engine",
                message: String(reason),
                color: "red"
            })
        })
    }

    return (
        <Container>
            <Card shadow="lg">
                <Stack>
                    <Breadcrumbs>{items}</Breadcrumbs>
                    <Table captionSide="bottom">
                        <Table.Caption>Files in {"/Home/Documents/Notes"}</Table.Caption>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>File Name</Table.Th>
                                <Table.Th>File Size</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {testfiles.map((file) => (
                                <Table.Tr key={file.filename}>
                                    <Table.Td>{file.filename}</Table.Td>
                                    <Table.Td>{file.size}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Card>
        </Container>
    )
}

export default Files;