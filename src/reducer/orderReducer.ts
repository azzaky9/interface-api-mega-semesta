import { Customer, ReducerInitialState, Order } from "../types/types";


type ACTIONTYPE =
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_ORDER"; payload: Order }
  | { type: "UPDATE_POSITION"; payload: ReducerInitialState["currentPosition"] }
  | { type: "CLEAR"; payload: keyof ReducerInitialState };

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
    case "UPDATE_POSITION":
      return {
        ...state,
        currentPosition: action.payload
      };
    default:
      throw new Error("dispatch not match with any action type");
  }
};

export { initialState, reducer, type ACTIONTYPE }