import { useMutation } from "react-query";
import moment from "moment";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import type { ReducerInitialState as RequestDataOrder } from "../types/types";
import { Link, ToastTrigger } from "@fluentui/react-components";
import {
  type ToastConfig,
  type ToastWithDescription,
  useAlert
} from "../context/ToastContext";
import { useLocation } from "react-router-dom";

type Amount = {
  amount: number;
};

const useRegisterOrder = () => {
  const { notifyBasicAlert, notifyWithDescription } = useAlert();

  const collectionRef = collection(db, "order_collections");
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const insertOrder = useMutation({
    mutationKey: ["insert-order"],
    mutationFn: async (
      data: Omit<RequestDataOrder, "currentPosition"> & Amount
    ) => {
      try {
        const now = moment().format("MMM DD YYYY, dddd HH:mm:ss");

        const dataRequest = {
          name: data.customer.customerNames,
          customerType: params.get("type"), // incharge - gelora- hotel
          orderList: data.orderList,
          amount: data.amount,
          payedAt: now, // timestamp
          cashier: "" // record admin it implement later
        };

        console.log(`Data request: `, dataRequest);

        await addDoc(collectionRef, dataRequest);

        const successConfig: ToastWithDescription = {
          message: "Berhasil",
          notifType: "success",
          description:
            "Data tersebut akan di display pada main table, bisa di check jika menekan tombol 'back'",
          toastProps: {
            action: (
              <ToastTrigger>
                <Link className='text-sm'>Dismiss</Link>
              </ToastTrigger>
            )
          }
        };

        notifyWithDescription(successConfig);
      } catch (error) {
        if (error instanceof Error) {
          const errConfig: ToastConfig = {
            message: "Error during insert order",
            notifType: "error"
          };

          notifyBasicAlert(errConfig);

          console.error(error.message, error.stack);
        }
      }
    }
  });

  return { insertOrder };
};

export { useRegisterOrder };
