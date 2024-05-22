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

import { Breadcrumbs, Card, Grid, Link, Pagination, Spacer, Table } from "@geist-ui/core"

function Files() {
    const data = [

        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Real World OCaml</Link>, size: '1.5MB', date: '2024-05-13 13:14:21'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Practical OCaml</Link>, size: '1.8MB', date: '2024-04-11 15:18:20'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Programming Rust</Link>, size: '1.5MB', date: '2024-05-13 21:10:21'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Advance prorgamming in Unix</Link>, size: '3.6MB', date: '2022-03-13 11:54:21'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Practical OCaml</Link>, size: '3.3MB', date: '2021-04-11 13:31:23'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Programming Rust</Link>, size: '1.8MB', date: '2019-05-18 21:10:51'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Rust Web Development</Link>, size: '7.3MB', date: '2018-01-13 12:14:44'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Programming Language Concepts</Link>, size: '1.8MB', date: '2024-11-21 15:10:37'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Lean opencv3</Link>, size: '7.1MB', date: '2022-09-13 21:20:36'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Concepts and semantics of programming language</Link>, size: '5.9MB', date: '2023-10-07 13:14:21'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Pro git 2nd</Link>, size: '1.7MB', date: '2021-04-21 18:18:03'
        },
        {
            name:
                /* @ts-ignore */
                <Link block underline color href="#">Modern compiler development</Link>, size: '4.5MB', date: '2021-06-18 21:10:11'
        }
    ]
    return (
        <>
            <Card shadow>
                <Grid.Container gap={1}>
                    <Grid xs={24}>
                        <Breadcrumbs>
                            <Breadcrumbs.Item>Home</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="">Inbox</Breadcrumbs.Item>
                            <Breadcrumbs.Item>Page</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </Grid>
                    <Grid xs={24}>
                        <Table hover data={data}>
                            <Table.Column prop="name" label="name" />
                            <Table.Column prop="size" label="size" />
                            <Table.Column prop="date" label="date" />
                        </Table>
                    </Grid>
                    <Spacer inline h={4} />
                    <Grid xs={24} justify='center'>
                        <Pagination count={20} initialPage={1} />
                    </Grid>
                </Grid.Container>
            </Card>

        </>
    )
}

export default Files;