import { SetStateAction, Dispatch } from "react";

type Customer = {
  customerNames: string;
  roomNumber?: number;
  extraInformation?: string;
};

type Order = {
  id: number;
  name: string;
  isChoosen: boolean;
  price: number;
};

type TSetStates<T> = Dispatch<SetStateAction<T>>;

type OrderList = Order[];

interface ReducerInitialState {
  customer: Customer;
  orderList: OrderList;
  currentPosition: "register" | "choosen-option";
}

export type { Customer, Order, OrderList, TSetStates, ReducerInitialState };
