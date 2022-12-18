import { Flex, HStack, StackDivider, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import { TaskType } from "../../models/Task";

interface Props {
  tasks?: TaskType[];
  updateTask?: any;
  deleteTask?: any;
  deleteTaskAll?: any;
  checkTask?: any;
}

const TaskList: React.FC<Props> = ({
  tasks,
  updateTask,
  deleteTask,
  deleteTaskAll,
  checkTask,
}) => {
  const color = useColorModeValue("gray.900","gray.300")
  return (
    <div>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.300"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        minWidth={'540px'}
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {tasks && tasks.map((task: TaskType) => (
          <HStack key={task.TaskID + Math.random()*10} opacity={task.isDone === true ? "0.2" : "1"}>
            <Text
              w="100%"
              p="8px"
              fontSize="18px"
              color={color}
              borderRadius="lg"
              as={task.isDone === true ? "s" : "samp"}
              cursor="pointer"
              onClick={() => checkTask(task.TaskID)}
            >
              {task.TaskDescription}
            </Text>
            {/* <DeleteTask
              task={task}
              deleteTask={deleteTask}
              deleteTaskAll={deleteTaskAll}
            />
            <UpdateTask task={task} updateTask={updateTask} /> */}
          </HStack>
        ))}
      </VStack>

      <Flex>
        {/* <DeleteAllTask deleteTaskAll={deleteTaskAll} /> */}
      </Flex>
    </div>
  );
};

export default TaskList;
