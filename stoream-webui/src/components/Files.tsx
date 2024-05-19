import { Link, Table } from "@geist-ui/core"

function Files() {
    const data = [
        { name: <Link block underline color href="#">Real World OCaml</Link>, size: '1.5MB', date: '2024-05-13 13:14:21' },
        { name: <Link block underline color href="#">Practical OCaml</Link>, size: '1.8MB', date: '2024-04-11 15:18:20' },
        { name: <Link block underline color href="#">Programming Rust</Link>, size: '1.5MB', date: '2024-05-13 21:10:21' },
        { name: <Link block underline color href="#">Advance prorgamming in Unix</Link>, size: '3.6MB', date: '2022-03-13 11:54:21' },
        { name: <Link block underline color href="#">Practical OCaml</Link>, size: '3.3MB', date: '2021-04-11 13:31:23' },
        { name: <Link block underline color href="#">Programming Rust</Link>, size: '1.8MB', date: '2019-05-18 21:10:51' },
        { name: <Link block underline color href="#">Rust Web Development</Link>, size: '7.3MB', date: '2018-01-13 12:14:44' },
        { name: <Link block underline color href="#">Programming Language Concepts</Link>, size: '1.8MB', date: '2024-11-21 15:10:37' },
        { name: <Link block underline color href="#">Lean opencv3</Link>, size: '7.1MB', date: '2022-09-13 21:20:36' },
        { name: <Link block underline color href="#">Concepts and semantics of programming language</Link>, size: '5.9MB', date: '2023-10-07 13:14:21' },
        { name: <Link block underline color href="#">Pro git 2nd</Link>, size: '1.7MB', date: '2021-04-21 18:18:03' },
        { name: <Link block underline color href="#">Modern compiler development</Link>, size: '4.5MB', date: '2021-06-18 21:10:11' }
    ]
    return (
        <>
            <Table hover data={data}>
                <Table.Column prop="name" label="name" />
                <Table.Column prop="size" label="size" />
                <Table.Column prop="date" label="date" />
            </Table>
        </>
    )
}

export default Files;