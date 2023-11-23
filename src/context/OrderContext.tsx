import { createContext, useContext, useReducer } from "react";
import { ACTIONTYPE, reducer, initialState } from "../reducer/orderReducer";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import type { ReducerInitialState } from "../types/types";
import { useQuery } from "react-query";
import { OrderResponse } from "../components/screen/MainDashboard";
import { UseQueryResult } from "react-query";

type TOrderContext = {
  state: ReducerInitialState;
  dispatch: React.Dispatch<ACTIONTYPE>;
  orderDataQ: UseQueryResult<OrderResponse[] | undefined, unknown>

};

const OrderContext = createContext({} as TOrderContext);

interface TPropOrderProvider {
  children: React.ReactNode;
}


const getOrderData = async () => {
  try {
    const q = query(collection(db, "order_collections"));

    const qSnapshots = await getDocs(q);

    const data = qSnapshots.docs.map((doc) => ({ docId: doc.id, ...doc.data() } as OrderResponse ));

    console.log(data)

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.message, error.name, error.stack);
    }
  }
};

const OrderProvider: React.FC<TPropOrderProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const dataOrderQ = useQuery({
    queryKey: "order-list",
    queryFn: getOrderData
  });


  const value = {
    state,
    dispatch,
    orderDataQ: dataOrderQ
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
