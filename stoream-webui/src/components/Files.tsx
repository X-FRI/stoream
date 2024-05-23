import { Card, Container, ScrollArea, Stack, Table } from "@mantine/core";
import { Breadcrumbs, Anchor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import * as Request from "../model/Request.res.mjs"
import { Directory } from "../model/Directory.gen"
import React from "react";
import { useLoaderData } from "react-router-dom";

export const fetch = async (): Promise<Directory | void> => {
    return await Request.Directory.request("/home/muqiu/Documents/Note").catch(reason => {
        notifications.show({
            title: "An error occurred during get the files from engine",
            message: String(reason),
            color: "red"
        })
    })
}

const Files = () => {
    const [breadcrumbs, setBreadcrumbs] = React.useState([{ title: 'Note', path: "/home/muqiu/Documents/Note" }])
    const [files, updateFiles]: any = React.useState(useLoaderData())

    const updateBreadcrumbs = (path: string) => {
        path.split("/home/muqiu/Documents/Note")[1].split("/").map(title => setBreadcrumbs(
            [
                { title: 'Note', path: "/home/muqiu/Documents/Note" },
                { title: title, path: path }
            ]
        ))
    }

    const render = (dir: Directory) => {
        if (dir.sub === undefined) {
            return <Table.Tr />
        }

        return dir.sub.map(dir =>
            <Table.Tr key={dir.name} style={{ cursor: "pointer" }} onClick={() => {
                updateBreadcrumbs(dir.path)
                updateFiles(render(dir))
            }}>
                <Table.Td>{dir.name}</Table.Td>
                <Table.Td>{dir.files.length}</Table.Td>
                <Table.Td>{(dir.size / 1024).toFixed()}</Table.Td>
            </Table.Tr>
        ).concat(dir.files.map(file =>
            <Table.Tr style={{ cursor: "pointer" }} key={file.filename}>
                <Table.Td>{file.filename}</Table.Td>
                <Table.Td>0</Table.Td>
                <Table.Td>{(file.filesize / 1024).toFixed()}</Table.Td>
            </Table.Tr>
        ))
    }

    return (
        <Container>
            <Card shadow="lg" withBorder>
                <Stack>
                    <Breadcrumbs>{
                        breadcrumbs.map((item, index) => (
                            <Anchor key={index} onClick={() => { console.log(item.path) }}>
                                {item.title}
                            </Anchor>
                        ))
                    }</Breadcrumbs>
                    <ScrollArea h={500}>
                        <Table captionSide="bottom" highlightOnHover>
                            <Table.Caption>Files in {"/home/muqiu/Documents/Note"}</Table.Caption>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Files</Table.Th>
                                    <Table.Th>Size (KB)</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {render(files)}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Stack>
            </Card>
        </Container>
    )
}

export default Files;