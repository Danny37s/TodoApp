import React from 'react'
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {Link as Rlink, useNavigate} from "react-router-dom"
import axios from 'axios';
import { axiosClient } from '../../api/axiosClient';
import { AuthApi } from '../../api/AuthApi';
import Cookies from 'js-cookie';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let color = useColorModeValue("whiteAlpha.400","gray.400")
    let bg = useColorModeValue("gray.400","whiteAlpha.400")
    const toast = useToast()
    const navigate = useNavigate();
    
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>)=>{
      setUsername(e.target.value);
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
      setPassword(e.target.value);
    }

  const handleShowClick = () => setShowPassword(!showPassword);
  const login = async ()=>{
    const data = await AuthApi.login({
      username:username,
      password:password
    })
    if(data.data[0]?.UserID){
      Cookies.set('userId',data.data[0].UserID)
      toast({
        title: 'Đăng nhập',
        description: "Đăng nhập thành công",
        status: 'success',
        duration: 2000,
      })
      navigate("/home")

    }else{
      toast({
        title: 'Đăng nhập',
        description:"Đăng nhập thất bại tên đăng nhập hoặc mật khẩu không đúng!!",
        status: 'error',
        duration: 2000,
      })
    }
    console.log(data)
  }
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="10px"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color={color} />}
                  />
                  <Input type="text" placeholder="username" color={color} _hover={{borderColor:"gray.900"}} borderColor={color} onChange={handleChangeUsername} />
                </InputGroup>
              </FormControl>
              <FormControl >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color={color}
                    children={<CFaLock color={color} />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChangePassword}
                    color={color}
                    borderColor={color}
                    _hover={{borderColor:"gray.900"}}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" color={color} onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={login}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box display="flex" gap="8px" color={color}>
        New to us?{" "}
        <Text color="teal.500">
          <Rlink to="/auth/signup">Sign Up</Rlink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login