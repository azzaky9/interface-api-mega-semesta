import CardSelling from "../card/CardSelling";
import { DatePickerInput } from "../input/dates/DatePicker";
import { Card } from "@fluentui/react-components";

export default function PointOfSales() {
  return (
    <Card className='max-w-[320px] h-fit px-3 py-5 col-span-2'>
      <div>
        <h1 className='font-bold text-2xl'>Point Of Sales</h1>
      </div>

      <DatePickerInput inputLabel='Tanggal Penjualan' />
      <div className='flex flex-col gap-3'>
        <CardSelling />
        <CardSelling />
      </div>
    </Card>
  );
}
