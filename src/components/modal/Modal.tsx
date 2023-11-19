import React from "react";
import { Dialog, DialogSurface } from "@fluentui/react-components";

type Props = {
  isOpen: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  customSize?: string;
  dialogContent: React.ReactNode;
};

export default function Modal(prop: Props) {
  const { isOpen, customSize, dialogContent } = prop;
  // const { addManyMenuFromJson } = useInputMenu();

  const createCustomSize = customSize ? customSize : "";

  return (
    <Dialog
      modalType='modal'
      open={isOpen}
    >
      <DialogSurface
        onClick={() => console.log("surface click")}
        className={`transform -translate-x-1/2 left-1/2 top-20 ${createCustomSize}`}
      >
        {dialogContent}
      </DialogSurface>
    </Dialog>
  );
}

export type { Props }