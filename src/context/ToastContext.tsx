import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastIntent,
  ToastTitleProps
} from "@fluentui/react-components";
import { createContext, useContext } from "react";

type ToastConfig = {
  message: string;
  notifType: ToastIntent;
  toastProps?: ToastTitleProps;
};

type InitialContext = {
  notifyBasicAlert: (config: ToastConfig) => void;
};

const ToastContext = createContext({} as InitialContext);

type Props = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<Props> = ({ children }) => {
  const mainToastId = useId("toaster");
  const { dispatchToast } = useToastController(mainToastId);

  const notifyBasicAlert = (config: ToastConfig) => {
    const { message, notifType, toastProps } = config;

    return dispatchToast(
      <Toast aria-label='basic-notify'>
        <ToastTitle {...toastProps}>{message}</ToastTitle>
      </Toast>,
      { intent: notifType }
    );
  };

  return (
    <ToastContext.Provider value={{ notifyBasicAlert }}>
      <Toaster
        toasterId={mainToastId}
        position='top-end'
        timeout={2200}
      />
      {children}
    </ToastContext.Provider>
  );
};

const useAlert = () => useContext(ToastContext);

export { ToastProvider, useAlert };

export type { ToastConfig };
