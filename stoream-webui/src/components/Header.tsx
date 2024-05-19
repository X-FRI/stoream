import { Breadcrumbs, Button, Grid, Spacer, Tooltip } from "@geist-ui/core";
import { Upload, FolderPlus } from '@geist-ui/icons'

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
                    <Tooltip text="Upload file">
                        <Button auto scale={0.25} icon={<Upload size={15} />} />
                    </Tooltip>
                    <Spacer inline w={.5} />
                    <Tooltip text="New folder">
                        <Button auto scale={0.25} icon={<FolderPlus size={15} />} />
                    </Tooltip>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Header;