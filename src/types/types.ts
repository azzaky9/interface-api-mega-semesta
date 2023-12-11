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
  role: "super_admin" | "admin" | "supervisor"
}

type Category = "baverage" | "foods" | "minibar" | "rokok" | "store";

interface DataRequest extends AddNewMenuForm {
  id: string;
}

type TSetStates<T> = Dispatch<SetStateAction<T>>;

type OrderList = Order[];

type OptionalIncluded = {
  price?: boolean,
  subtotal?: boolean,
  total?: boolean,
  ignoreAll?: boolean
}

type PostReceipt = {
  data: OrderList,
  include: OptionalIncluded
}

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
  Admin,
  PostReceipt
};
