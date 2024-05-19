import { Card, Link, Text } from '@geist-ui/core'

function About() {
    return (

        <Card width="100%">
            <Text h4 my={0}>Stoream WebUI</Text>
            <Text>极简主义者的网盘系统</Text>
            <Card.Footer>
                <Link icon block underline color href="https://github.com/x-fri/stoream">
                    Visit source code on GitHub.
                </Link>
            </Card.Footer>
        </Card>

    )
}

export default About