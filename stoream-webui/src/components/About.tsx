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

import { Badge, Card, Container, Group, Image, SimpleGrid, Text, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";

/// Image files used in About component
const images = [
    { path: "/src/assets/rescript-logo.svg", tooltip: "Fast, Simple, Fully Typed JavaScript from the Future", href: "https://rescript-lang.org/" },
    { path: "/src/assets/fsharp-logo.svg", tooltip: "An open-source language that makes it easy to write succinct, robust, and performant code.", href: "https://dotnet.microsoft.com/en-us/languages/fsharp" },
    { path: "/src/assets/typescript-logo.svg", tooltip: "JavaScript with syntax for types.", href: "https://www.typescriptlang.org/" },
    { path: "/src/assets/react-logo.svg", tooltip: "The library for web and native user interfaces", href: "https://react.dev/" },
    { path: "/src/assets/mantine-logo.svg", tooltip: "A fully featured React components library", href: "https://mantine.dev/" },
    { path: "/src/assets/suave-logo.png", tooltip: "A simple web development F# library providing a lightweight web server and a set of combinators to manipulate route flow and task composition.", href: "https://suave.io/" }
];

/** About component is used to display information related to the project,
  * currently it is a card */
const About = () => {
    return (
        <Container>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="/src/assets/logo.png"
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Stoream</Text>
                    <Badge color="black" />
                </Group>

                <Text size="sm" c="dimmed">
                    A self-hosted network disk system tailored for minimalists
                </Text>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Built in</Text>
                </Group>

                <Card.Section inheritPadding mt="sm" pb="md">
                    <SimpleGrid cols={3}>
                        {images.map(({ path, tooltip, href }) => (
                            <Tooltip label={tooltip}>
                                <Link to={href}>
                                    <Image src={path} key={path} radius="sm" />
                                </Link>
                            </Tooltip>
                        ))}
                    </SimpleGrid>
                </Card.Section>
            </Card>
        </Container>
    )
}

export default About