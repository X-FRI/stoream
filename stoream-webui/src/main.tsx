import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error.tsx'
import Login from './pages/Login.tsx'
import Main from './pages/Main.tsx'
import { RequestPath } from './model/FileTree.res.mjs'

const filesLoader = async () => await RequestPath.request("")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <RouterProvider router={
        createBrowserRouter([
          { path: "/", element: <App />, errorElement: <Error /> },
          { path: "/login", element: <Login />, errorElement: <Error /> },
          { path: "/files", element: <Main />, errorElement: <Error />, loader: filesLoader }
        ])
      } />
    </GeistProvider>
  </React.StrictMode>,
)
