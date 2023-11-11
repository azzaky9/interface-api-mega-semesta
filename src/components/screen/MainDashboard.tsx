import {
  Button,
  Divider,
  Input,
  DialogBody,
  DialogTitle,
  DialogContent
} from "@fluentui/react-components";
import PointOfSales from "../card/PointOfSales";
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

export default function MainDashboard() {
  const { isOpen, handleClose, handleOpen } = useModal();

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
    <div className='mx-2 my-8 grid grid-cols-8 gap-x-3 h-[90vh]'>
      <div className='col-span-6 flex flex-col bg-white rounded-md shadow-xl '>
        <div className='px-4 py-3 h-fit flex justify-between'>
          <h3>Daftar Penjualan</h3>
          <Input
            contentBefore={<SearchRegular aria-label='Search' />}
            placeholder='Search by name customer'
          />
        </div>
        <Divider />
        <div className='h-full'>
          <TableSelling />
        </div>
        <Divider />
        <div className='px-4 py-3 h-fit flex gap-3'>
          <Modal
            dialogContent={
              <DialogBody>
                <DialogTitle className='font-semibold text-lg text-center mb-4'>
                  Pesanan Baru
                </DialogTitle>
                <DialogContent>
                  <NewOrderForm />
                </DialogContent>
              </DialogBody>
            }
            customSize='w-[380px]'
            title='tst'
            isOpen={isOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
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
                  <NewOrderForm />
                </DialogContent>
              </DialogBody>
            }
            customSize='w-[380px]'
            title='tst'
            isOpen={isOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
      </div>
      <PointOfSales />
    </div>
  );
}
