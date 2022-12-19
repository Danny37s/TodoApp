import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
const DeleteTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAllTask = ()=>{
    
  }
  return (
    <>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="8"
        onClick={onOpen}
      >
        Excluir Todos
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>
            Nếu xác nhận thì công việc của bạn sẽ bị xóa, bạn chắc chứ ??
          </ModalHeader>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button colorScheme="blue" onClick={() => {}}>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTask;
