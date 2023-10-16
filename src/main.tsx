import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { OrderProvider } from "./context/OrderContext.tsx";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MenuProvider } from "./context/MenuContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
        <MenuProvider>
          <SnackbarProvider />
          <ReactQueryDevtools initialIsOpen={true} />
          <App />
        </MenuProvider>
      </OrderProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
