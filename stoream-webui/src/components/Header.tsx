import { Button, Grid } from "@geist-ui/core";
import { Upload, FolderPlus } from '@geist-ui/icons'

function Header() {
    return (
        <>
            <Grid.Container gap={1}>
                <Grid>
                    {/* @ts-ignore comment */}
                    <Button shadow type="secondary" icon={<Upload size={15} />}>
                        Upload file
                    </Button>
                </Grid>
                <Grid>
                    {/* @ts-ignore comment */}
                    <Button shadow type="secondary" icon={<FolderPlus size={15} />}>
                        Create folder
                    </Button>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Header;