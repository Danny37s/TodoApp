import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './pages/AuthLayout';
import Home from './components/Home';
import Cookies from 'js-cookie'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({
  config,
  colors: {
    black: {
      100: "rgb(26, 32, 44)",
      // ...
      900: "#000",
    },
  },
});

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!Cookies.get("userId")){
      navigate('/auth/login');
    }    
  }, [])
  
  
 
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='/auth/*' element={<AuthLayout/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
