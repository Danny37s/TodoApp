import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'

const AuthLayout = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default AuthLayout