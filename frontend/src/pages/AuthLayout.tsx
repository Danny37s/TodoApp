import { Button, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'

const AuthLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <div className="flex justify-end gap-4 w-screen p-5">
        <IconButton
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound={true}
          size="md"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          aria-label=""
        />
      </div>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default AuthLayout