import { SetStateAction, Dispatch } from "react";
import { AddNewMenuForm } from "../context/MenuContext";

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

type Category = "baverage" | "foods" | "minibar" | "etc";

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
  DataRequest
};
