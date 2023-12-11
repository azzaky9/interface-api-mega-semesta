import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useRegisterOrder } from "../../hooks/useOrder";
import Customer from "./orders/Customer";
import OrderList from "./orders/OrderList";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  Card
} from "@fluentui/react-components";
import {
  DocumentDatabaseRegular,
  FoodRegular,
  PersonRegular,
  ReceiptRegular
} from "@fluentui/react-icons";
import { useMutation } from "react-query";
import { url } from "../../constant/constants";
import axios from "axios";
import { PostReceipt } from "../../types/types";
import { useAlert } from "../../context/ToastContext";

export default function PreviewOrderCard() {
  const { insertOrder } = useRegisterOrder();
  const { state, orderDataQ } = useOrder();
  const { notifyBasicAlert } = useAlert();

  const [isAlreadySave, setIsAlreadySave] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const doInsertToDB = async () => {
    const createRequired = {
      customer: state.customer,
      orderList: state.orderList,
      amount: totalAmount,
      paymentMethod: state.customer.paymentMethod
    };

    if (state.orderList.length === 0) {
      return notifyBasicAlert({
        message: "Tidak ada pesanan yang di pilih",
        notifType: "error"
      });
    }

    if (!isAlreadySave) {
      await insertOrder.mutateAsync(createRequired);

      orderDataQ.refetch();
    } else {
      notifyBasicAlert({ message: "Data already exist", notifType: "error" });
    }

    setIsAlreadySave(true);
  };

  return (
    <Card className='col-span-2 me-4'>
      <div className='bg-white'>Detail Order</div>
      <OrderList />
      <Customer setTotalAmount={setTotalAmount} />
      <div className='bg-white py-4 flex gap-2 justify-end'>
        <Button
          disabled={isAlreadySave || insertOrder.isLoading}
          onClick={doInsertToDB}
          icon={<DocumentDatabaseRegular />}
          iconPosition='after'
        >
          Save
        </Button>
        <MenuListPrintOption />
      </div>
    </Card>
  );
}

function MenuListPrintOption() {
  const { state } = useOrder();
  const { notifyBasicAlert } = useAlert();

  console.log(state.orderList);

  type PrintOption = "kitchen" | "customer";

  const getIncluded = (type: PrintOption): PostReceipt["include"] => {
    if (type === "kitchen") {
      return {
        price: true,
        subtotal: true,
        total: true
      };
    } else {
      return { ignoreAll: true };
    }
  };

  const createReceipt = useMutation({
    mutationKey: ["post-receipt"],
    mutationFn: async (type: PrintOption) => {
      try {
        const requestBody: PostReceipt = {
          data: state.orderList,
          include: getIncluded(type)
        };

        const response = await axios.post(`${url}/receipt`, requestBody);

        console.log(response);

        notifyBasicAlert({ notifType: "success", message: "success to print" });
      } catch (error) {
        notifyBasicAlert({
          notifType: "error",
          message: "error occured check the console."
        });

        console.log(error);
      }
    }
  });

  const customerReceipt = async () =>
    await createReceipt.mutateAsync("customer");

  const kitchenReceipt = async () => await createReceipt.mutateAsync("kitchen");

  return (
    <Menu>
      <MenuTrigger>
        <Button
          icon={<ReceiptRegular />}
          iconPosition='after'
          appearance='primary'
        >
          Print Receipt
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader className='text-sm'>Opsi Print</MenuGroupHeader>
            <MenuItem
              icon={<PersonRegular />}
              onClick={customerReceipt}
            >
              {" "}
              Customer
            </MenuItem>
            <MenuItem
              icon={<FoodRegular />}
              onClick={kitchenReceipt}
            >
              {" "}
              Kitchen
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
