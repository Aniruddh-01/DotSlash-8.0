import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout.jsx'
import QueryForm from './components/QueryForm.jsx'
import AdminQueriesPanel from './components/AdminQueriesPanel.jsx'
import PublicQueriesTable from './components/PublicQueriesTable.jsx'
import PolicyOpinions from './components/PolicyOpinions.jsx'
// import Login from './components/Login.jsx'
// import Signup from './components/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <QueryForm />
      },
      {
        path: 'admin',
        element: <AdminQueriesPanel />
      },
      {
        path: 'public',
        element: <PublicQueriesTable />
      },
      {
        path: 'policy',
        element: <PolicyOpinions />
      },
      // {
      //   path: 'login',
      //   element: <Login />
      // },
      // {
      //   path: 'signup',
      //   element: <Signup />
      // }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>,
)