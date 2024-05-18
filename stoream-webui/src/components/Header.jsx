import { Breadcrumbs, Button, Grid, Spacer } from "@geist-ui/core";
import { Upload, FilePlus } from '@geist-ui/icons'

function Header() {
    return (
        <>
            <Grid.Container gap={1}>
                <Grid xs={20}>
                    <Breadcrumbs>
                        <Breadcrumbs.Item>Home</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="">Documents</Breadcrumbs.Item>
                        <Breadcrumbs.Item>Books</Breadcrumbs.Item>
                    </Breadcrumbs>
                </Grid>

                <Grid xs={4} justify="right">
                    <Button auto scale={0.25} icon={<Upload size={15} />} />
                    <Spacer inline w={.5} />
                    <Button auto scale={0.25} icon={<FilePlus size={15} />} />
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Header;