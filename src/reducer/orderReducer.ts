import { Customer, ReducerInitialState, Order } from "../types/types";

type ACTIONTYPE =
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_ORDER"; payload: Order }
  | { type: "DELETE_ORDER"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "UPDATE_POSITION"; payload: ReducerInitialState["currentPosition"] }
  | { type: "CLEAR" };

const initialState: ReducerInitialState = {
  customer: {
    customerNames: "",
    extraInformation: "",
    roomNumber: 1
  },
  orderList: [],
  currentPosition: "register"
};

const reducer = (state: ReducerInitialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customer: action.payload
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        orderList: [...state.orderList, action.payload]
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orderList: [...state.orderList].filter(
          (order) => order.id !== action.payload
        )
      };
    case "UPDATE_QTY":
      return {
        ...state,
        orderList: [...state.orderList].map((order) => {
          if (action.payload.id === order.id) {
            return { ...order, qty: action.payload.qty };
          }

          return { ...order };
        })
      };
    case "UPDATE_POSITION":
      return {
        ...state,
        currentPosition: action.payload
      };
    case "CLEAR":
      return {
        customer: {
          customerNames: "",
          extraInformation: "",
          roomNumber: 1
        },
        orderList: [],
        currentPosition: "register"
      } as ReducerInitialState;
    default:
      throw new Error("dispatch not match with any action type");
  }
};

export { initialState, reducer, type ACTIONTYPE };
