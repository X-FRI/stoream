import { Breadcrumbs, Button, Grid, Spacer, Tooltip } from "@geist-ui/core";
import { Upload, FolderPlus } from '@geist-ui/icons'

function Header() {
    return (
        <>
            <Grid.Container gap={1}>
                <Grid>
                    <Button shadow type="secondary" icon={<Upload size={15} />}>
                        Upload file
                    </Button>
                </Grid>
                <Grid>
                    <Button shadow type="secondary" icon={<FolderPlus size={15} />}>
                        Create folder
                    </Button>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Header;