import { ListGroup, ListGroupItem } from "reactstrap";
import { Order } from "../../../types/types";
import useCurrency from "../../../hooks/useCurrency";
import { useOrder } from "../../../context/OrderContext";
import { ChangeEvent, memo } from "react";

export default function OrderList() {
  const { state } = useOrder();

  return (
    <ListGroup className='overflow-scroll overflow-x-hidden h-[50%]'>
      {state.orderList.length !== 0 ? (
        state.orderList.map((order, index) => (
          <Product
            {...order}
            key={index}
          />
        ))
      ) : (
        <span className='p-4 text-sm text-gray-600'>
          Belum ada pesanan yang di pilih
        </span>
      )}
    </ListGroup>
  );
}

interface TPropProduct extends Omit<Order, "isChoosen"> {
  extraInformation?: string;
}

const Product = memo((props: TPropProduct) => {
  const { dispatch } = useOrder();
  const { formatToIdrCurrency } = useCurrency();
  const { extraInformation, name, price, qty, id } = props;

  const handleUpdateQty = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: {
        id,
        qty: Number(e.target.value)
      }
    });
  };

  return (
    <ListGroupItem className='flex gap-2 justify-between items-center m-0'>
      <div>
        <p className='text-sm '>{name}</p>
        <span className='text-sm text-gray-500'>{extraInformation}</span>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <p className='text-sm'>{formatToIdrCurrency(price)}</p>
        <input
          min={1}
          value={qty}
          onChange={handleUpdateQty}
          className='w-[39px] text-sm'
          type='number'
        />
      </div>
    </ListGroupItem>
  );
});
