import { Grid, Page, Pagination, Spacer } from "@geist-ui/core"
import UserDetails from "../components/UserDetails"
import Header from "../components/Header"
import Files from "../components/Files"
import Folders from "../components/Folders"

const Main = ({ hidden }) => {
    const uri = window.location.pathname
    const content = (uri === '/' ? <Files /> : <Folders />)
    return (
        <div hidden={hidden}>
            <Page dotBackdrop width="95%" padding={0}>
                <UserDetails />

                <Spacer h={2} />
                <Grid.Container>
                    <Grid xs={4}>
                        <Folders />
                    </Grid>
                    <Grid xs={20}>
                        <Grid.Container justify='center'>
                            <Grid xs={24}>
                                <Header />
                            </Grid>
                            <Spacer inline h={2} />
                            <Grid xs={24}>
                                {content}
                            </Grid>
                            <Spacer inline h={4} />
                            <Grid xs={24} justify='center'>
                                <Pagination count={20} initialPage={1} />
                            </Grid>
                        </Grid.Container>
                    </Grid>
                </Grid.Container>
            </Page>
        </div>
    )
}

export default Main