import { Capacity, Card, Divider, Grid, Page, Pagination, Spacer, Tooltip, useTheme } from "@geist-ui/core"
import UserDetails from "../components/UserDetails"
import Header from "../components/Header"
import Files from "../components/Files"
import Folders from "../components/FileTree"

const Main = ({ hidden }) => {
    const theme = useTheme()

    return (
        <div hidden={hidden}>
            <Page width="80%">
                <Grid.Container gap={1}>
                    <Grid xs>
                        <Tooltip type="success" text="Occupied: 15%, remaining: 75%" placement="right">
                            <Capacity value={15} color={theme.palette.error} width={5} scale={1.5} />
                        </Tooltip>
                    </Grid>
                    <Grid xs={5} justify="right">
                        <UserDetails />
                    </Grid>
                    <Grid xs={24}>
                        <Header />
                    </Grid>
                    <Spacer h={2} />
                    <Grid.Container gap={1} >
                        <Grid>
                            <Card shadow paddingRight={5}>
                                <Folders />
                            </Card>
                        </Grid>
                        <Spacer w={3} />
                        <Grid xs>
                            <Card shadow>
                                <Grid.Container gap={1}>
                                    <Grid xs={24}>
                                        <Files />
                                    </Grid>
                                    <Spacer inline h={4} />
                                    <Grid xs={24} justify='center'>
                                        <Pagination count={20} initialPage={1} />
                                    </Grid>
                                </Grid.Container>
                            </Card>
                        </Grid>
                    </Grid.Container>
                </Grid.Container>
            </Page>
        </div>
    )
}

export default Main