import { Card, Grid, Page, Pagination, Spacer, Tooltip, useTheme } from "@geist-ui/core"
import DiskCapacity from "../components/Capacity"
import UserDetails from "../components/UserDetails"
import Header from "../components/Header"
import Files from "../components/Files"
import FileTree from "../components/FileTree"
import { useLoaderData } from "react-router-dom"

const Main = () => {
    const content = useLoaderData()

    return (
        <>
            <Page width="80%">
                <Grid.Container gap={1}>
                    <Grid xs> <DiskCapacity /> </Grid>
                    {/* @ts-ignore comment */}
                    <Grid xs={5} justify="right"> <UserDetails /> </Grid>
                    <Grid xs={24}> <Header /> </Grid>
                    <Spacer h={2} />
                    <Grid.Container gap={1} >
                        <Grid> <Card shadow paddingRight={5}> <FileTree content={content} /> </Card> </Grid>
                        <Spacer w={3} />
                        <Grid xs> <Files /> </Grid>
                    </Grid.Container>
                </Grid.Container>
            </Page>
        </>
    )
}

export default Main