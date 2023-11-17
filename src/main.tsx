import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { OrderProvider } from "./context/OrderContext.tsx";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MenuProvider } from "./context/MenuContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={webLightTheme}>
        <ToastProvider>
          <OrderProvider>
            <MenuProvider>
              <SnackbarProvider />
              <ReactQueryDevtools initialIsOpen={true} />
              <App />
            </MenuProvider>
          </OrderProvider>
        </ToastProvider>
      </FluentProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
