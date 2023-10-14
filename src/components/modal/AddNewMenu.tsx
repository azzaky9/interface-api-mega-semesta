import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalProps,
  ModalFooter
} from "reactstrap";
import NewMenuForm from "../forms/NewMenuForm";

type PropAddNewMenu = {
  isOpen: boolean;
  toggleModal: () => void;
  handleClose?: () => void;
  handleOpen?: () => void;
};

export default function AddNewMenu(prop: PropAddNewMenu & ModalProps) {
  const { isOpen, toggleModal, handleClose, handleOpen, ...args } = prop;

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      centered
      {...args}
    >
      <ModalHeader toggle={toggleModal}>Tambah menu baru</ModalHeader>
      <ModalBody className='bg-gray-50'>
        <NewMenuForm handleClose={handleClose!} />
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}
