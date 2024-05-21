import { Route, Router } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main'

function App() {
  const page = (isLogin) => {
    return isLogin ? <Main /> : <Login />
  }

  return (
    <>
      {page(false)}
    </>
  )
}

export default App
