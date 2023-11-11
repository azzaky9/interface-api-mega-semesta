import * as React from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, handleClose, handleOpen, toggle };
};
