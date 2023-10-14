import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { OrderProvider } from "./context/OrderContext.tsx";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OrderProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider />
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </QueryClientProvider>
    </OrderProvider>
  </React.StrictMode>
);
