import {
  Button,
  Divider,
  Input,
  DialogBody,
  DialogTitle,
  DialogContent
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
import { useQuery } from "react-query";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase-config";
import { type Order } from "../../types/types";
import Loader from "../utils/Loader";

type AdminResponse = {
  adminName: string,
  isAfterEdit: boolean
  lastEdittedAt: string
}

type PaymentResponse = {
  amount: number
  isPending: boolean
  isSuccess: boolean
  payedAt: string
}

type OrderResponse = {
  docId: string
  name: string;
  customerType: "gelora" | "event" | "hotel";
  orderList: Order[];
  payment: PaymentResponse;
  admin: AdminResponse;
  createdAt: string;
  amount: number;
};

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

export default function MainDashboard() {
  const { isOpen, handleClose, handleOpen } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: "order-list",
    queryFn: getOrderData
  });

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
            <TableSelling dataOrder={data ? data : []} />
          ) : (
            <Loader customLabel="Load order.."  />
          )}
        </div>
        <Divider />
        <div className='px-4 py-3 h-fit flex gap-3'>
          <Button
            icon={<DeleteRegular />}
            className='bg-red-500 hover:bg-red-700 text-white disabled:bg-gray-50 disabled:text-white'
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
