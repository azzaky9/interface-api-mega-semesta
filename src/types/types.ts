import { SetStateAction, Dispatch } from "react";
import { AddNewMenuForm } from "../context/MenuContext";

type Customer = {
  customerNames: string;
  roomNumber?: number;
  extraInformation?: string;
  paymentMethod: "cash" | "unpaid"
};

type Order = {
  id: string;
  name: string;
  price: number;
  qty: number
};

type Admin = {
  name: string
}

type Category = "baverage" | "foods" | "minibar" | "rokok" | "store";

interface DataRequest extends AddNewMenuForm {
  id: string;
}

type TSetStates<T> = Dispatch<SetStateAction<T>>;

type OrderList = Order[];

interface ReducerInitialState {
  customer: Customer;
  orderList: OrderList;
  currentPosition: "register" | "choosen-option";
}

export type {
  Category,
  Customer,
  Order,
  OrderList,
  TSetStates,
  ReducerInitialState,
  DataRequest,
  Admin
};
