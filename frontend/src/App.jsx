import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QueryForm from './components/QueryForm'
import PublicQueriesTable from './components/PublicQueriesTable'
import AdminQueriesPanel from './components/AdminQueriesPanel'

function App() {

  return (
    <>
      {/* <QueryForm /> */}
      {/* <PublicQueriesTable /> */}
      <AdminQueriesPanel/>
    </>
  )
}

export default App
