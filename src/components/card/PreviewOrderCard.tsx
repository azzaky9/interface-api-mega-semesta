import { Card, CardHeader, CardFooter } from "reactstrap";
import Customer from "./orders/Customer";
import { Printer } from "lucide-react";

import OrderList from "./orders/OrderList";
import LoadingButton from "../buttons/LoadingButton";

export default function PreviewOrderCard() {
  return (
    <Card className='my-2 flex flex-col shadow-xl col-span-2 w-[80%] h-[79%]'>
      <CardHeader className='bg-white'>Detail Order</CardHeader>
      <OrderList />
      <Customer />
      <CardFooter className='bg-white py-4 flex justify-end'>
        <LoadingButton
          isloading='false'
          color='primary'
          text='Print Receipt'
          defaulticon={<Printer fontSize='0.8rem' />}
          size='sm'
        />
      </CardFooter>
    </Card>
  );
}
