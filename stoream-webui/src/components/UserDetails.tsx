import About from './About'
import React from 'react'
import { Avatar, Drawer } from '@geist-ui/core'

function UserDetails() {
    const [userDetailsComponent, updateUserDetailsComponent] = React.useState(false)
    return (
        <>
            <Avatar text='M' onClick={() => updateUserDetailsComponent(true)} />
            <Drawer visible={userDetailsComponent} onClose={() => updateUserDetailsComponent(false)} placement="left">
                <Drawer.Title>Drawer</Drawer.Title>
                <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
                <Drawer.Content>
                    <About />
                </Drawer.Content>
            </Drawer>
        </>
    )
}

export default UserDetails;