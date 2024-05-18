import { Card, Grid, Link, Text } from '@geist-ui/core'

function About() {
    return (
        <Grid.Container gap={1.5}>
            <Grid xs={12} justify="center">
                <Card width="100%">
                    <Text h4 my={0}>Stoream WebUI</Text>
                    <Text>极简主义者的网盘系统</Text>
                    <Card.Footer>
                        <Link icon block underline color href="https://github.com/x-fri/stoream">
                            Visit source code on GitHub.
                        </Link>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid xs={12} justify="center">
                <Card width="100%" type="dark">
                    <Text h4 my={0}>Stoream WebUI</Text>
                    <Text>极简主义者的网盘系统</Text>
                    <Card.Footer>
                        <Link icon block underline color href="http://101.42.54.166/plugins/gitiles/stoream">
                            Visit source code on Gerrit.
                        </Link>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default About