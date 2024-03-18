import { useState } from 'react'
import Header from './Header'
import './App.css'
import background from './assets/background2.svg'
import upload from './assets/upload.svg'
import pdfIcon from './assets/pdf-icon.svg'
import Home from './Home'
import Dashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Home/>
    <Dashboard/>
  )
}

export default App
