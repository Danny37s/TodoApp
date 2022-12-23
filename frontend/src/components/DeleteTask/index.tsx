
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  IconButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { TaskType } from "@/models/Task";
import { useAppDispatch } from "../../app/hooks";
import { deleteTask, getTask } from "../../../src/features/tasks/taskSlice";
import Cookies from "js-cookie";
interface Props {
  tasks?: TaskType;
}
const DeleteTask:React.FC<Props> = ({
  tasks
}) => {
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteTaskById = (taskId:number,)=>{
    const userId = Number(Cookies.get("userId"))
    console.log(taskId);
    dispatch(deleteTask({
      taskId:Number(taskId),
      userId:userId
    }));
  }
  return (
    <>
      <IconButton
        icon={<FiTrash2 />}
        isRound={true}
        onClick={onOpen}
        aria-label={""}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Bạn có chắc muốn xóa không?</ModalHeader>
          <ModalBody>
            <Text>{tasks?.TaskDescription}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr="3px" onClick={onClose}>
              Hủy
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {tasks&&deleteTaskById(tasks.TaskID)}}
            >
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTask;
