import { Grid, Tooltip, Capacity, useTheme } from "@geist-ui/core"

const DiskCapacity = () => {
    const theme = useTheme()

    return (
        <>
            <Tooltip type="success" text="Occupied: 15%, remaining: 75%" placement="right">
                <Capacity value={15} color={theme.palette.error} width={5} scale={1.5} />
            </Tooltip>
        </>
    )
}

export default DiskCapacity