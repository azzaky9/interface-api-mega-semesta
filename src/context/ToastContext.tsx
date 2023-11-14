import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastIntent,
  ToastTitleProps,
  ToastBody
} from "@fluentui/react-components";
import { createContext, useContext } from "react";

type ToastConfig = {
  message: string;
  notifType: ToastIntent;
  toastProps?: ToastTitleProps;
};

type Description = {
  description: string;
};

type ToastWithDescription = ToastConfig & Description;

type FireNotifiedToast<T> = (config: T) => void;

type InitialContext = {
  notifyBasicAlert: FireNotifiedToast<ToastConfig>;
  notifyWithDescription: FireNotifiedToast<ToastWithDescription>;
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

  const notifyWithDescription = (config: ToastWithDescription) => {
    const { message, notifType, toastProps, description } = config;

    return dispatchToast(
      <Toast aria-label='basic-notify'>
        <ToastTitle {...toastProps} className="font-bold" >{message}</ToastTitle>
        <ToastBody className='text-zinc-700 text-sm leading-none'>
          {description}
        </ToastBody>
      </Toast>,
      { intent: notifType }
    );
  };

  return (
    <ToastContext.Provider value={{ notifyBasicAlert, notifyWithDescription }}>
      <Toaster
        toasterId={mainToastId}
        position='top-end'
      />
      {children}
    </ToastContext.Provider>
  );
};

const useAlert = () => useContext(ToastContext);

export { ToastProvider, useAlert };

export type { ToastConfig, ToastWithDescription };
