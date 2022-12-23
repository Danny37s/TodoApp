import React from 'react'
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
  import { useState } from "react";
  import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from '../../app/hooks';
import { deleteAllTask, getTask } from '../../features/tasks/taskSlice';
import Cookies from 'js-cookie';
  
const DeleteAllTask = () => {
    const userId = Number(Cookies.get('userId'))
    const dispatch = useAppDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteAll = ()=>{
        dispatch(deleteAllTask(userId))
        onClose()
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
        Delete All
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>
            Nếu xác nhận thì công việc của bạn sẽ bị xóa, bạn chắc chứ ?
          </ModalHeader>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button colorScheme="blue" onClick={handleDeleteAll}>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteAllTask