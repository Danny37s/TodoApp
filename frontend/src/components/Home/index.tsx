import {
  Button,
  Heading,
  IconButton,
  Link,
  Spinner,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getTask,
  selectLoading,
  selectTask,
} from "../../features/tasks/taskSlice";
import AddTask from "../AddTask";
import TaskList from "../TaskList";
const Home = () => {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const listTask = useAppSelector(selectTask);
  const isLoading = useAppSelector(selectLoading);
  const navigate = useNavigate();
  useEffect(() => {
    loadTask();
  }, []);
  const loadTask = async () => {
    const userId = Number(Cookies.get("userId"));
    await dispatch(getTask(userId));
  };
  const signout = ()=>{
    Cookies.remove("userId");
    navigate("/auth/login")
  }

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center"><Spinner size='xl' /></div>
  ) : (
    <VStack p={4} minH="100vh" pb={28}>
      <div className="flex justify-end gap-4 w-screen p-5">
        <Button onClick={signout}>Sign out</Button>
        <IconButton
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound={true}
          size="md"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          aria-label=""
        />
      </div>

      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300, blue.500)"
        bgClip="text"
      >
        TODO APP
      </Heading>
      <AddTask/>
      <TaskList tasks={listTask} />
    </VStack>
  );
};

//updateTask={updateTask} deleteTask={deleteTask} deleteTaskAll={deleteTaskAll} checkTask={checkTask}

export default Home;
