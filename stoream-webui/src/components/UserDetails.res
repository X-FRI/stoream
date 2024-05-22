open GeistUI

let make = () => {
  let (userDetailsComponent, updateUserDetailsComponent) = React.useState(() => false)

  <>
    <User
      src="/src/assets/logo.png"
      name="Muqiu Han"
      onClick={() => updateUserDetailsComponent(_ => true)}
      scale={1.5}>
      {"A dumb panda"->React.string}
    </User>
    <Drawer
      visible={userDetailsComponent}
      onClose={() => updateUserDetailsComponent(_ => false)}
      placement="bottom">
      <Drawer.Title>
        <Avatar src="/src/assets/logo.png" />
      </Drawer.Title>
      <Drawer.Subtitle> {"Muqiu Han"->React.string} </Drawer.Subtitle>
      <Drawer.Content>
        <About />
      </Drawer.Content>
    </Drawer>
  </>
}
