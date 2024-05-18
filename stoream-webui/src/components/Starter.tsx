import { Card, Grid, Link, Text } from '@geist-ui/core'

function Starter() {
    return (
        <Grid.Container gap={1.5}>
            <Grid xs={12} justify="center">
                <Card width="100%">
                    <Text h4 my={0}>Stoream WebUI</Text>
                    <Text>极简主义者的网盘系统</Text>
                    <Card.Footer>
                        <Link color target="_blank" href="https://github.com/x-fri/stoream">Visit source code on GitHub.</Link>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid xs={12} justify="center">
                <Card width="100%" type="dark">
                    <Text h4 my={0}>Stoream WebUI</Text>
                    <Text>极简主义者的网盘系统</Text>
                    <Card.Footer>
                        <Link target="_blank" href="http://101.42.54.166/plugins/gitiles/stoream">Visit source code on Gerrit.</Link>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default Starter