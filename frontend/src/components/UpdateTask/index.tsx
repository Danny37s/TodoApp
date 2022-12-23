import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { TaskType } from "../../models/Task";
import { useAppDispatch } from "../../app/hooks";
import { getTask, updateTask } from "../../features/tasks/taskSlice";
import Cookies from "js-cookie";

interface Props {
  tasks?: TaskType;
}
const UpdateTask: React.FC<Props> = ({ tasks }) => {
    const userId = Number(Cookies.get('userId'))
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState("");
  const dispatch = useAppDispatch()
  const [priority, setPriority] = useState(tasks?.Important||1);
    const updateTaskById = (taskId:number, taskTitle:string, important:number)=>{
        console.log(taskId,taskTitle,important);
        dispatch(updateTask({
            taskId: taskId,
            taskTitle: taskTitle,
            important: priority,
            userId: userId,
            taskDescription: taskTitle,
            isDone: false
        }))
    }
    const handleChangeValue = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setPriority(Number(e.target.value))
        console.log(e.target.value)
    }
  const initialRef = React.useRef(null);
  return (
    <>
      <IconButton
        icon={<FiEdit />}
        isRound={true}
        onClick={onOpen}
        aria-label={""}
      />
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Update your task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Enter your task"
                defaultValue={tasks?.TaskDescription}
                onChange={(e) => setBody(e.target.value)}
                onFocus={(e) => setBody(e.target.value)}
              />
              <Select defaultValue={priority} onChange={handleChangeValue} width={"200px"} marginTop="16px" h="46">
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
                onClick={() => (tasks && updateTaskById(tasks?.TaskID, body, priority))}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateTask;
