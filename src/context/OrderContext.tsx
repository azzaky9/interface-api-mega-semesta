import { createContext, useContext, useReducer } from "react";
import { ACTIONTYPE, reducer, initialState } from "../reducer/orderReducer";
import {
  query,
  collection,
  getDocs,
  getDoc,
  DocumentData,
  DocumentReference
} from "firebase/firestore";
import { db } from "../configs/firebase-config";
import type { ReducerInitialState, Admin } from "../types/types";
import { useQuery } from "react-query";
import { OrderResponse } from "../components/screen/MainDashboard";
import { UseQueryResult } from "react-query";

type TOrderContext = {
  state: ReducerInitialState;
  dispatch: React.Dispatch<ACTIONTYPE>;
  orderDataQ: UseQueryResult<OrderResponse<Admin | string>[] | undefined, unknown>;
};

const OrderContext = createContext({} as TOrderContext);

interface TPropOrderProvider {
  children: React.ReactNode;
}

const getOrderData = async () => {
  try {
    const q = query(collection(db, "order_collections"));

    const qSnapshots = await getDocs(q);

    const data = qSnapshots.docs.map(async (doc) => {
      const result = { docId: doc.id, ...doc.data() } as OrderResponse<DocumentReference<DocumentData>>;

      const adminProfiles = await getDoc(result.admin);

      if (adminProfiles.exists()) {
        return { ...result, admin: adminProfiles.data() } as OrderResponse<Admin>;
      } else {
        return { ...result, admin: "Admin not exist" } as OrderResponse<string>;
      }
    });

    const dataAll = await Promise.all(data) 

    return dataAll;
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
    queryFn: getOrderData,
    staleTime: 60 * 1000 * 5 
  });

  console.log(dataOrderQ.data)

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
