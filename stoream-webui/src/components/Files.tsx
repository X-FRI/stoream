import { Page, Table } from "@geist-ui/core"

function Files() {
    const data = [
        { name: 'Real World OCaml', size: '1.5MB', date: '2024-05-13 13:14:21' },
        { name: 'Practical OCaml', size: '1.8MB', date: '2024-04-11 15:18:20' },
        { name: 'Programming Rust', size: '1.5MB', date: '2024-05-13 21:10:21' }
    ]
    return (
        <Page>
            <Table data={data}>
                <Table.Column prop="name" label="name" />
                <Table.Column prop="size" label="size" />
                <Table.Column prop="date" label="date" />
            </Table>
        </Page>
    )
}

export default Files;