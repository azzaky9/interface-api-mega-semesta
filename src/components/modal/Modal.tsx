import React from "react";
import {
  Modal as ModalContainer,
  ModalHeader,
  ModalBody,
  ModalProps,
  ModalFooter
} from "reactstrap";

// import { useMenu } from "../../context/MenuContext";
// import useInputMenu from "../../hooks/useInputMenu";

type PropAddNewMenu = {
  isOpen: boolean;
  toggleModal: () => void;
  handleClose?: () => void;
  handleOpen?: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal(prop: PropAddNewMenu & ModalProps) {
  const { isOpen, toggleModal, handleClose, handleOpen, title, ...args } = prop;
  // const { addManyMenuFromJson } = useInputMenu();

  return (
    <ModalContainer
      isOpen={isOpen}
      toggle={toggleModal}
      centered
      className='mx-auto'
      {...args}
    >
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <ModalBody className='bg-gray-50'>
        {args.children}
        {/* <NewMenuForm handleClose={handleClose!} /> */}
      </ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContainer>
  );
}
