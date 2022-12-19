import {
  Flex,
  HStack,
  StackDivider,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TaskType } from "../../models/Task";
import emptyImg from "../../assets/images/empty.svg";
import DeleteTask from "../DeleteTask";
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
  const color = useColorModeValue("gray.900", "gray.300");
  return (
    <div>
      <VStack
        divider={<StackDivider />}
        p="5"
        borderRadius="lg"
        w="100%"
        minWidth={"540px"}
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
        paddingRight="0"
        paddingLeft="0"
      >
        {tasks ? (
          tasks.map((task: TaskType) => (
            <HStack
              key={task.TaskID + Math.random() * 10}
              opacity={task.isDone === true ? "0.2" : "1"}
              borderColor="gray.300"
              borderWidth="2px"
              borderRadius="10px"
            >
              <Text
                w="100%"
                p="8px"
                textAlign="left"
                fontSize="18px"
                color={color}
                borderRadius="lg"
                as={task.isDone === true ? "s" : "samp"}
                cursor="pointer"
                onClick={() => checkTask(task.TaskID)}
              >
                {task.TaskDescription}
              </Text>
              <DeleteTask />
              {/* <UpdateTask task={task} updateTask={updateTask} /> */}
            </HStack>
          ))
        ) : (
          <div>
            <img src={emptyImg} alt="" width="100%" height="100%" />
          </div>
        )}
      </VStack>

      <Flex>{/* <DeleteAllTask deleteTaskAll={deleteTaskAll} /> */}</Flex>
    </div>
  );
};

export default TaskList;
