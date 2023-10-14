import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return { isOpen, handleClose, handleOpen, toggleModal };
};

export default useModal;
