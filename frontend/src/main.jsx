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
<<<<<<< HEAD
// import Login from './components/Login.jsx'
// import Signup from './components/Signup.jsx'

=======
import DiscoverData from './components/DiscoverData.jsx'
>>>>>>> f37ea359ae4b741961853cf9b4a995213e280eb0
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
<<<<<<< HEAD
      // {
      //   path: 'login',
      //   element: <Login />
      // },
      // {
      //   path: 'signup',
      //   element: <Signup />
      // }
=======
      {
        path : 'discover',
        element : <DiscoverData/>
      }
>>>>>>> f37ea359ae4b741961853cf9b4a995213e280eb0
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>,
)