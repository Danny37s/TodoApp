import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './pages/AuthLayout';
import Home from './components/Home';
import Cookies from 'js-cookie'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!Cookies.get("userId")){
      navigate('/auth/login');
    }
  
    
  }, [])
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  
  const theme = extendTheme({
    config,
  });
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
