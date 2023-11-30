import React, { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button
} from "@fluentui/react-components";
import { Props as BaseModalProps } from "./Modal";
import Modal from "./Modal";

type TPropsContent = {
  title: string;
  description: string;
  confirmAction: () => void;
  cancelAction: () => void;
  confirmVariant?: VariantProps<typeof button>["intent"];
};

const button = cva("button", {
  variants: {
    intent: {
      success: [
        "bg-green-600",
        "shadow-xl",
        "hover:bg-green-800",
        "text-white",
        "disabled:bg-gray-50",
        "disabled:text-white"
      ],
      error: [
        "bg-red-500",
        "shadow-xl",
        "hover:bg-red-700",
        "text-white",
        "disabled:bg-gray-50",
        "disabled:text-white"
      ]
    }
  }
});

interface ButtonConfirmProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const ConfirmButton: React.FC<ButtonConfirmProps> = ({
  className,
  intent,
  ...props
}) => (
  <Button
    className={button({ intent, className })}
    {...props}
  >
    Confirm
  </Button>
);

function ConfirmModalContent(props: TPropsContent) {
  const { cancelAction, confirmAction, description, title, confirmVariant } =
    props;

  return (
    <DialogBody>
      <DialogTitle className='font-bold text-lg'>{title}</DialogTitle>
      <DialogContent className='pt-3 pb-5'>{description}</DialogContent>
      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button
            appearance='secondary'
            onClick={cancelAction}
          >
            Close
          </Button>
        </DialogTrigger>
        <ConfirmButton
          intent={confirmVariant}
          onClick={confirmAction}
        />
      </DialogActions>
    </DialogBody>
  );
}

type TPropsBasedModal = {
  contentProps: TPropsContent;
  modalProps: Omit<BaseModalProps, "dialogContent">;
};

const ConfirmModal: React.FC<TPropsBasedModal> = ({
  contentProps,
  modalProps
}) => (
  <Modal
    dialogContent={<ConfirmModalContent {...contentProps} />}
    {...modalProps}
  />
);

export type { TPropsBasedModal };

export { ConfirmButton }

export default memo(ConfirmModal);
