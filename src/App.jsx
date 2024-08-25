import React from 'react'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div>
      <Toaster/>
      <Home />
    </div>
  )
}

export default App