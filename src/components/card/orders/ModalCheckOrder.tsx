import {
  DialogBody,
  DialogTitle,
  Title2,
  DialogContent,
  DialogActions,
  Button,
  Text,
  Caption1
} from "@fluentui/react-components";
import Modal from "../../modal/Modal";
import { CardHeader, Card } from "@fluentui/react-components";
import { Cart24Regular } from "@fluentui/react-icons";
import useCurrency from "../../../hooks/useCurrency";
import type { DefaultModalControlProp } from "../../../hooks/useModal";
import type { Admin } from "../../../types/types";
import type { OrderResponse } from "../../screen/MainDashboard";

interface CheckOrderModalProps
  extends Omit<DefaultModalControlProp, "toggleModal" | "handleOpen"> {
  selectionOrder: OrderResponse<Admin> | null;
  handleOpenOrder: (dataOrder: OrderResponse<Admin>) => void;
}

function CheckOrderModal(props: CheckOrderModalProps) {
  const { isOpen, handleClose, selectionOrder } = props;
  const { formatToIdrCurrency } = useCurrency();

  const content = (
    <DialogBody>
      <DialogTitle>
        <Title2 className='font-bold'>
          Menampilkan Order: {selectionOrder?.name}
        </Title2>
      </DialogTitle>
      <DialogContent className='my-5 pt-3 pb-5 h-[300px] overflow-y-auto'>
        {selectionOrder?.orderList.map((order, index) => (
          <OrderList
            description={`${order.name} \n${formatToIdrCurrency(
              order.price
            )} / 1 \nKuantiti: ${order.qty}`}
            title={`Product ${index + 1}`}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          appearance='outline'
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </DialogBody>
  );

  return (
    <Modal
      customSize='w-[390px]'
      dialogContent={content}
      isOpen={isOpen}
    />
  );
}

type OrderListProdProps = {
  title: string;
  description: string;
};

const OrderList: React.FC<OrderListProdProps> = ({
  title,
  description
}: OrderListProdProps) => (
  <Card
    appearance='outline'
    size='small'
    className='mt-2'
  >
    <CardHeader
      image={
        <Button
          size='large'
          icon={<Cart24Regular />}
          className='ms-2 me-3'
        />
      }
      header={<Text className='font-semibold text-lg'>{title}</Text>}
      description={
        <Caption1 className='text-gray-400 text-sm whitespace-break-spaces'>
          {description}
        </Caption1>
      }
    />
  </Card>
);

export default CheckOrderModal