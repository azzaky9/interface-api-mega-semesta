import { Order } from "../../../types/types";
import useCurrency from "../../../hooks/useCurrency";
import { useOrder } from "../../../context/OrderContext";
import { ChangeEvent, memo } from "react";
import { Tag, TagGroup } from "@fluentui/react-components";

export default function OrderList() {
  const { state } = useOrder();

  return (
    <div className='overflow-scroll overflow-x-hidden h-[248px]'>
      <div className='flex flex-col gap-2 py-5'>
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
      </div>
    </div>
  );
}

interface TPropProduct extends Omit<Order, "isChoosen"> {
  extraInformation?: string;
}

const Product = memo((props: TPropProduct) => {
  const { dispatch } = useOrder();
  const { formatToIdrCurrency } = useCurrency();
  const { name, price, qty, id } = props;

  const handleUpdateQty = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: {
        id,
        qty: Number(e.target.value)
      }
    });
  };

  const deleteOrder = (orderId: string) => {
    dispatch({
      type: "DELETE_ORDER",
      payload: orderId
    });
  };

  return (
    <div className='grid grid-cols-2 gap-2 justify-between items-center m-0'>
      <TagGroup onDismiss={() => deleteOrder(id)}>
        <Tag
          appearance='outline'
          dismissible
          dismissIcon={{ "aria-label": "remove" }}
          value={id}
          className='h-fit transition duration-100 hover:bg-zinc-50 shadow-sm hover:cursor-pointer'
        >
          <span className='text-sm w-[25px] whitespace-pre-line '>{name}</span>
        </Tag>
      </TagGroup>
      {/* <p className='text-sm '>{name}</p> */}
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
    </div>
  );
});
