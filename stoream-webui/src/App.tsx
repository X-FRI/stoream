import { Grid, Page, Pagination, Spacer } from '@geist-ui/core'
// import About from "./components/About"
import Header from "./components/Header"
import Files from './components/Files'
import Folders from './components/Folders'
import UserDetails from './components/UserDetails'


function App() {
  const uri = window.location.pathname
  const content = (uri === '/' ? <Files /> : <Folders />)
  return (
    <Page dotBackdrop width="95%" padding={0}>
      <UserDetails />

      <Grid.Container justify='center' marginTop={2}>
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
    </Page>
  )
}

export default App
