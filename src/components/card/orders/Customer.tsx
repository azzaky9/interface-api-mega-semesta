import { useLocation } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";
import useCurrency from "../../../hooks/useCurrency";
import { Divider, Field, Input } from "@fluentui/react-components";
import { ReceiptAddRegular } from "@fluentui/react-icons";
import { useCallback, useEffect } from "react";
import { TSetStates } from "../../../types/types";

type TPropsCustomer = {
  setTotalAmount: TSetStates<number>;
};

export default function Customer({ setTotalAmount }: TPropsCustomer) {
  const { state } = useOrder();
  const { formatToIdrCurrency } = useCurrency();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const getQuerParams = useCallback(() => {
    const queryData = {
      name: params.get("name"),
      type: params.get("type"),
      noBedroom: params.get("rn")
    };

    return queryData;
  }, [location]);

  const queryData = getQuerParams();

  console.log(queryData);

  const isOrderEmpty = state.orderList.length === 0;
  const servicePercent = queryData.type === "hotel" ? 10 : 0;
  const totalPriceOrder = state.orderList.reduce(
    (a, b) => a + b.price * b.qty,
    0
  );
  const getPricePercentage = (servicePercent * totalPriceOrder) / 100;
  const calculateTotal = totalPriceOrder + getPricePercentage;

  const createIssueValuePair: Props[] = [
    {
      issue: "Name",
      value: queryData.name ?? ""
    },
    {
      issue: "Tipe Order",
      value: queryData.type === "hotel" ? "Tamu Hotel" : "Incharge"
    },
    {
      issue: "No. Kamar",
      value:
        queryData.type && queryData.type === "hotel"
          ? String(queryData.noBedroom)
          : "-"
    },
    {
      issue: "Subtotal",
      value: isOrderEmpty
        ? formatToIdrCurrency(0)
        : formatToIdrCurrency(totalPriceOrder)
    },
    {
      issue: `Service`,
      value: isOrderEmpty
        ? formatToIdrCurrency(0)
        : formatToIdrCurrency(getPricePercentage)
    }
  ];

  useEffect(() => {
    setTotalAmount(calculateTotal);
  }, [calculateTotal]);

  return (
    <div className='p-5 '>
      <h3 className='text-sm text-gray-500'>Pesanan Oleh</h3>
      <div className='pt-3 flex flex-col gap-1'>
        {createIssueValuePair.map((item, index) => (
          <OrderInformation
            issue={item.issue}
            value={item.value}
            key={index}
          />
        ))}

        <Divider />

        <div className='flex justify-between '>
          <h3>Total</h3>
          <p className='text-gray-500'>
            {isOrderEmpty
              ? formatToIdrCurrency(0)
              : formatToIdrCurrency(calculateTotal)}
          </p>
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          <Field>
            <Input
              contentBefore={<ReceiptAddRegular />}
              appearance='filled-darker-shadow'
              placeholder='Extra Information'
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

type Props = {
  issue: string;
  value: string;
};

function OrderInformation({ issue, value }: Props) {
  return (
    <div className='flex justify-between'>
      <h3 className='text-sm'>{issue}</h3>
      <h5 className='text-base text-slate-500'>{value}</h5>
    </div>
  );
}
