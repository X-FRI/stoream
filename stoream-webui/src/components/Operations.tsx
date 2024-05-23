import { Button, Container, Group, Input } from "@mantine/core"
import { SearchIcon } from "./Icons";

const Operations = () => {
    return (
        <Container>
            <Group justify="flex-start">
                <Button> Upload </Button>
                <Button> Create </Button>
                <Input placeholder="Search" leftSection={<SearchIcon size={"1em"} />} />
            </Group>
        </Container>
    )
}

export default Operations;