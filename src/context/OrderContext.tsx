import { createContext, useContext, useState } from "react";
import type { Customer, Order, TSetStates } from "../types/types";

type OrderList = Order[];

interface TInitialOrderContext {
  customer: Customer | null;
  setCustomer: TSetStates<Customer | null>;
  orderList: OrderList;
  setOrderList: TSetStates<OrderList>;
}

const OrderContext = createContext({} as TInitialOrderContext);

interface TPropOrderProvider {
  children: React.ReactNode;
}

const OrderProvider: React.FC<TPropOrderProvider> = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [orderList, setOrderList] = useState<OrderList>([]);

  const initial: TInitialOrderContext = {
    customer: currentCustomer,
    setCustomer: setCurrentCustomer,
    orderList,
    setOrderList
  };

  return (
    <OrderContext.Provider value={initial}>{children}</OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
