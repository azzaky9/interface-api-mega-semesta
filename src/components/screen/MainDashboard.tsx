import {
  Button,
  Divider,
  Input,
  DialogBody,
  DialogTitle,
  DialogContent,
} from "@fluentui/react-components";
import { TableSelling } from "../tables/TableSelling";
import {
  DeleteRegular,
  SearchRegular,
  AddRegular,
  PrintRegular
} from "@fluentui/react-icons";
import { MenuAction } from "../buttons/MenuButton";
import MenuButton from "../buttons/MenuButton";
import useModal from "../../hooks/useModal";
import Modal from "../modal/Modal";
import NewOrderForm from "../main-components/NewOrderForm";
import { type Order } from "../../types/types";
import Loader from "../utils/Loader";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";
import { doc } from "firebase/firestore";
import { useRegisterOrder } from "../../hooks/useOrder";
import { db } from "../../configs/firebase-config";

type InsertInfo = {
  isAfterEdit: boolean;
  lastEdittedAt: string;
};

type PaymentResponse = {
  amount: number;
  isPending: boolean;
  isSuccess: boolean;
  payedAt: string;
};

type OrderResponse<T> = {
  docId: string;
  name: string;
  customerType: "gelora" | "incharge" | "hotel";
  orderList: Order[];
  payment: PaymentResponse;
  insertInfo: InsertInfo;
  admin: T;
  createdAt: string;
  amount: number;
};

export default function MainDashboard() {
  const { orderDataQ } = useOrder();
  const { deleteMultipleOrder } = useRegisterOrder();
  const { isOpen, handleClose, handleOpen } = useModal();

  const [selectedDeleting, setSelectedDeleting] = useState<string[]>([]);

  console.log(selectedDeleting);

  const { data, isLoading } = orderDataQ;

  const listMenu: MenuAction[] = [
    {
      action: () => handleOpen(),
      icons: <AddRegular />,
      name: "Tambah Pesanan"
    },
    {
      action: () => console.log("click"),
      icons: <PrintRegular />,
      name: "Print Penjualan"
    }
  ];

  const doDelete = async () => {
    if (selectedDeleting.length === 0) {
      return;
    }

    const convertAllToRef = selectedDeleting.map((selected) =>
      doc(db, "order_collections", selected)
    );

    await deleteMultipleOrder.mutateAsync(convertAllToRef);

    setSelectedDeleting([])

    orderDataQ.refetch()
  };


  return (
    <div className='mx-4 my-8 grid grid-cols-8 gap-x-3 h-[90vh]'>
      <div className='col-span-full flex flex-col bg-white rounded-md shadow-xl '>
        <div className='px-4 py-3 h-fit flex justify-between'>
          <h3>Daftar Penjualan</h3>
          <Input
            contentBefore={<SearchRegular aria-label='Search' />}
            placeholder='Search by name customer'
          />
        </div>
        <Divider />
        <div className='h-full w-full'>
          {!isLoading ? (
            // @ts-ignore
            <TableSelling setSelectedDelete={setSelectedDeleting} dataOrder={data ? data : []} collectionDeletes={selectedDeleting} />
          ) : (
            <Loader customLabel='Load order..' />
          )}
        </div>
        <Divider />
        <div className='px-4 py-3 h-fit flex gap-3'>
          <Button
          onClick={doDelete}
            disabled={selectedDeleting.length === 0}
            icon={<DeleteRegular />}
            className='bg-red-500 hover:bg-red-700 text-white disabled:bg-gray-50 disabled:text-gray-500'
            appearance='outline'
          >
            Delete
          </Button>
          <MenuButton listMenu={listMenu} />
          <Modal
            dialogContent={
              <DialogBody>
                <DialogTitle className='font-semibold text-lg text-center mb-3'>
                  Pesanan Baru
                </DialogTitle>
                <DialogContent>
                  <NewOrderForm handleClose={handleClose} />
                </DialogContent>
              </DialogBody>
            }
            customSize='w-[380px]'
            isOpen={isOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
      </div>
      {/* <PointOfSales /> */}
    </div>
  );
}

export { type OrderResponse };
