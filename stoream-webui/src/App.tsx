import { Page } from '@geist-ui/core'
// import About from "./components/About"
import Header from "./components/Header"
import Files from './components/Files'

function App() {
  return (
    <Page dotBackdrop width="90%" padding={0}>
      <Header />
      <Files />
    </Page>
  )
}

export default App
