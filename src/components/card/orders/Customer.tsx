import { useOrder } from "../../../context/OrderContext";
import useCurrency from "../../../hooks/useCurrency";
import { Input } from "reactstrap";

export default function Customer() {
  const { state } = useOrder();
  const { formatToIdrCurrency } = useCurrency();

  console.log(state);

  const isOrderEmpty = state.orderList.length === 0;
  const totalPriceOrder = state.orderList.reduce(
    (a, b) => a + b.price * b.qty,
    0
  );
  const isCustomerHotelGuest = Boolean(state.customer.roomNumber);

  return (
    <div className='p-5 w-full'>
      <h3 className='text-sm text-gray-500'>Pesanan:</h3>
      <div className='pt-3 flex flex-col gap-2'>
        <div className='flex justify-between '>
          <h3>{state.customer.customerNames}</h3>
          <p className='text-gray-500'>
            {isCustomerHotelGuest ? "Tamu Hotel" : "Incharge"}
          </p>
        </div>
        <div className='flex justify-between '>
          <h3>Nomor Kamar</h3>
          <p className='text-gray-500'>
            {isCustomerHotelGuest ? state.customer.roomNumber : "-"}
          </p>
        </div>
        <div className='flex justify-between '>
          <h3>Total</h3>
          <p className='text-gray-500'>
            {isOrderEmpty
              ? formatToIdrCurrency(0)
              : formatToIdrCurrency(totalPriceOrder)}
          </p>
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          <Input
            type='text'
            placeholder='Catatan pesanan'
          />
        </div>
      </div>
    </div>
  );
}
