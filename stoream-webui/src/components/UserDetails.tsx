import About from './About'
import React from 'react'
import { Avatar, Drawer, User } from '@geist-ui/core'

function UserDetails() {
    const [userDetailsComponent, updateUserDetailsComponent] = React.useState(false)
    return (
        <>
            <User src="/src/assets/logo.png" name="Muqiu Han" onClick={() => updateUserDetailsComponent(true)} />
            <Drawer visible={userDetailsComponent} onClose={() => updateUserDetailsComponent(false)} placement="left">
                <Drawer.Title>
                    <Avatar src="/src/assets/logo.png" />
                </Drawer.Title>
                <Drawer.Subtitle>
                    Muqiu Han
                </Drawer.Subtitle>
                <Drawer.Content>
                    <About />
                </Drawer.Content>
            </Drawer>
        </>
    )
}

export default UserDetails;