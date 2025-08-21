import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp'
import {BrowserRouter, Routes, Route} from 'react-router-dom' //for routing between pages
import Login from './Login'
import Home from './Home'

function App() {

  // setup for demonstration
  const [count, setCount] = useState(0)

  
  return (
    <BrowserRouter>
      <Routes>
        {/* route for pages  */}
        <Route path="/" element={<SignUp />} />     
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
