import { createContext, useContext, useReducer, useState } from "react";
import { ACTIONTYPE, reducer, initialState } from "../reducer/orderReducer";
import type { ReducerInitialState } from "../types/types";

type TOrderContext = {
  state: ReducerInitialState;
  dispatch: React.Dispatch<ACTIONTYPE>;
};

const OrderContext = createContext({} as TOrderContext);

interface TPropOrderProvider {
  children: React.ReactNode;
}

const OrderProvider: React.FC<TPropOrderProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
