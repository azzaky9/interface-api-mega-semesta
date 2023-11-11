import React from "react";
import { Dialog, DialogSurface } from "@fluentui/react-components";

type PropAddNewMenu = {
  isOpen: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  title: string;
  customSize?: string;
  dialogContent: React.ReactNode;
};

export default function Modal(prop: PropAddNewMenu) {
  const { isOpen, customSize, dialogContent } = prop;
  // const { addManyMenuFromJson } = useInputMenu();

  const createCustomSize = customSize ? customSize : "";

  return (
    <Dialog
      modalType='modal'
      open={isOpen}
    >
      <DialogSurface
        className={`transform -translate-x-1/2 left-1/2 top-20 ${createCustomSize}`}
      >
        {dialogContent}
      </DialogSurface>
    </Dialog>
  );
}
