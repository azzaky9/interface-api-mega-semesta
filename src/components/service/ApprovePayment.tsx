import { Button } from "@fluentui/react-components";
import { useRegisterOrder } from "../../hooks/useOrder";
import ConfirmModal, { TPropsBasedModal } from "../modal/ConfirmModal";
import useModal from "../../hooks/useModal";
import { type OrderResponse } from "../screen/MainDashboard";

type Props = {
  docData: OrderResponse;
};

export default function ApprovePayment({ docData }: Props) {
  const { approvePayment } = useRegisterOrder();
  const { handleClose, handleOpen, isOpen } = useModal();

  const approveUnpaidPayment = () => {
    approvePayment.mutateAsync(docData).then((_) => handleClose());
  };

  const createPropsModal: TPropsBasedModal = {
    contentProps: {
      title: "Konfirmasi",
      description: `
        Pembayaran akan di update ke cash, 
        konfirmasi untuk melanjutkan.
      `,
      confirmAction: approveUnpaidPayment,
      cancelAction: handleClose,
      confirmVariant: "success"
    },
    modalProps: {
      isOpen: isOpen,
      customSize: "w-[390px]",
      handleClose,
      handleOpen
    }
  };

  return (
    <>
      <ConfirmModal {...createPropsModal} />
      <Button
        appearance='primary'
        onClick={handleOpen}
      >
        Approve
      </Button>
    </>
  );
}
