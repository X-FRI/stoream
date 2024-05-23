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