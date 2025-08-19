import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
