import { useMutation } from "react-query";
import moment from "moment";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import type { ReducerInitialState as RequestDataOrder } from "../types/types";
import { Link, ToastTrigger } from "@fluentui/react-components";
import {
  type ToastConfig,
  type ToastWithDescription,
  useAlert
} from "../context/ToastContext";
import { useLocation } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { type OrderResponse } from "../components/screen/MainDashboard";
import { useOrder } from "../context/OrderContext";

type Amount = {
  amount: number;
};

const useRegisterOrder = () => {
  const { notifyBasicAlert, notifyWithDescription } = useAlert();
  const { orderDataQ } = useOrder()

  const collectionRef = collection(db, "order_collections");
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const insertOrder = useMutation({
    mutationKey: ["insert-order"],
    mutationFn: async (
      data: Omit<RequestDataOrder, "currentPosition"> & Amount
    ) => {
      try {
        console.log(data);

        const now = moment().format("MMM DD YYYY, dddd HH:mm:ss");

        const { paymentMethod } = data.customer;

        const createPaymentObj = {
          payedAt: paymentMethod === "cash" ? now : "Not Record", // timestamp
          isPending: paymentMethod === "unpaid",
          isSuccess: paymentMethod === "cash",
          amount: data.amount
        };

        const createAdminRecord = {
          adminName: "", // record admin it implement later
          isAfterEdit: false,
          lastEdittedAt: now // timestamp
        };

        const dataRequest = {
          name: data.customer.customerNames,
          customerType: params.get("type"), // incharge - gelora- hotel
          orderList: data.orderList,
          amount: data.amount,
          payment: createPaymentObj,
          admin: createAdminRecord
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

  const approvePayment = useMutation({
    mutationKey: ["approve-payment"],
    mutationFn: async (docData: OrderResponse) => {
      try {
        const now = moment().format("MMM DD YYYY, dddd HH:mm:ss");

        const docToUpdateRef = doc(db, "order_collections", docData.docId);
        const bindAppovedValue = {
          ...docData.payment,
          isPending: false,
          isSuccess: true,
          payedAt: now
        };

        await updateDoc(docToUpdateRef, {
          payment: bindAppovedValue
        });

        orderDataQ.refetch()

        setTimeout(() => {
          notifyBasicAlert({
            message: "success to update payment!",
            notifType: "success"
          });
        }, 500);


      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error(error.message, error.name, error.code);

          setTimeout(() => {
            notifyBasicAlert({
              message: "error during update payment",
              notifType: "error"
            });
          }, 500);
        }
      }
    }
  });

  return { insertOrder, approvePayment };
};

export { useRegisterOrder };
