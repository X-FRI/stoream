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

import { Badge, Card, Container, Group, Image, SimpleGrid, Text } from "@mantine/core";

const images = [
    "/src/assets/rescript-logo.svg",
    "/src/assets/typescript-logo.svg",
    "/src/assets/rust-logo.svg",
    "/src/assets/react-logo.svg",
    "/src/assets/mantine-logo.svg",
];

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
                    <Badge color="blue" />
                </Group>

                <Text size="sm" c="dimmed">
                    A self-hosted network disk system tailored for minimalists
                </Text>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Built in</Text>
                </Group>

                <Card.Section inheritPadding mt="sm" pb="md">
                    <SimpleGrid cols={3}>
                        {images.map((image) => (
                            <Image src={image} key={image} radius="sm" />
                        ))}
                    </SimpleGrid>
                </Card.Section>
            </Card>
        </Container>
    )
}

export default About