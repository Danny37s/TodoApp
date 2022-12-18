import { Button, HStack, Input, Select, useToast } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "../../features/tasks/taskSlice";
import { TaskPayloadType, TaskType } from "../../models/Task";

const AddTask = () => {
  const toast = useToast();
  const [content, setContent] = useState("");
  const [statusInput, setStatusInput] = useState(true);
    const dispatch = useAppDispatch()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const taskText = content.trim();

    if (!taskText) {
      toast({
        title: "Digite sua tarefa",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setStatusInput(false);

      return setContent("");
    }

    const task:TaskPayloadType = {
      taskId: Math.floor(Math.random() * 10000),
      userId: Number(Cookies.get("userId")),
      taskTitle: taskText,
      taskDescription: taskText,
      important: 1,
      isDone: false,
    };
    dispatch(addTask(task))
    // addTask(task);
    setContent("");
  }

  if (content && !statusInput) {
    setStatusInput(true);
  }
  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="4" mb="4">
        <Input
          h="46"
          borderColor={!statusInput ? "red.300" : "transparent"}
          variant="filled"
          placeholder="Add new todo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <Select defaultValue={2} width={"200px"}>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={19}>Low</option>
        </Select>
        <Button colorScheme="blue" px="8" pl="10" pr="10" h="46" type="submit">
          Add
        </Button>
      </HStack>
    </form>
  );
};

export default AddTask;
