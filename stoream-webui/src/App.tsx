import { Page, Spacer } from '@geist-ui/core'
// import About from "./components/About"
import Header from "./components/Header"
import Files from './components/Files'
import UserDetails from './components/UserDetails'

function App() {
  return (
    <Page dotBackdrop width="90%" padding={0}>
      <UserDetails />
      <Spacer inline h={4} />
      <Header />
      <Files />
    </Page>
  )
}

export default App
