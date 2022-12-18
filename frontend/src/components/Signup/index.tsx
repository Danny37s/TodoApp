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
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {Link as Rlink, useNavigate} from "react-router-dom"
import { AuthApi } from '../../api/AuthApi';
import { useToast } from '@chakra-ui/react'
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const toast = useToast()
  const navigate = useNavigate();
  
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
  }
  const handleChangeCPassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setCPassword(e.target.value);
  }
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleCShowClick = () => setShowCPassword(!showCPassword);
  const signin = async ()=>{
    const data = await AuthApi.signup({
      username: username,
      password: password
    })

    if(data.data.status){
      toast({
        title: 'Đăng ký',
        description: "Tạo Tài khoản thành công",
        status: 'success',
        duration: 2000,
      })
      navigate("/auth/login")
    }
    else{
      toast({
        title: 'Đăng ký',
        description: data.data.message,
        status: 'error',
        duration: 2000,
      })
    }
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
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="username" onChange={handleChangeUsername} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChangePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handleChangeCPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleCShowClick}>
                      {showCPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={signin}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Have account?{" "}
        <Link color="teal.500" href="#">
          <Rlink to="/auth/login">Login</Rlink>
        </Link>
      </Box>
    </Flex>
  );
}

export default Signup