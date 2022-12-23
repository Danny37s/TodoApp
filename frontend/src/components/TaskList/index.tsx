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
import DeleteAllTask from "../DeleteAllTask";
import UpdateTask from "../UpdateTask";
import { useAppDispatch } from "../../app/hooks";
import { updateTask } from "../../features/tasks/taskSlice";
import Cookies from "js-cookie";
import { ChevronUpIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons'

interface Props {
  tasks?: TaskType[];
  updateTask?: any;
  deleteTask?: any;
  deleteTaskAll?: any;
}




const TaskList: React.FC<Props> = ({
  tasks,
  deleteTask,
  deleteTaskAll,
}) => {
  const userId = Number(Cookies.get('userId'));
  const dispatch = useAppDispatch()

  const checkTask = (task:TaskType)=>{
    dispatch(updateTask({
      taskId: task.TaskID,
      taskTitle: task.TaskTitle,
      taskDescription: task.TaskDescription,
      isDone: !task.isDone,
      userId: userId,
      important: task.Important
    }))

  }
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
        {(tasks && tasks.length >0) ? (
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
                onClick={() => checkTask(task)}
              >
                {task.TaskDescription}
              </Text>
              <div>{task.Important===1?<ChevronUpIcon  boxSize={6} color={"red.400"}/>:task.Important===2?<MinusIcon boxSize={6} color={"yellow.400"}/>:<ChevronDownIcon boxSize={6} color={"green.400"}/>}</div>
              <DeleteTask tasks={task} />
              <UpdateTask tasks={task}/>
            </HStack>
          ))
        ) : (
          <div>
            <img src={emptyImg} alt="" width="100%" height="100%" />
          </div>
        )}
      </VStack>

      <Flex><DeleteAllTask/></Flex>
    </div>
  );
};

export default TaskList;
