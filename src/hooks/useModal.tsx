import { useState } from "react";

type DefaultModalControlProp = {
  handleClose: () => void
  handleOpen: () => void
  toggleModal: () => void
  isOpen: boolean
}

const useModal = (): DefaultModalControlProp => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return { isOpen, handleClose, handleOpen, toggleModal };
};

export type  { DefaultModalControlProp }

export default useModal;
