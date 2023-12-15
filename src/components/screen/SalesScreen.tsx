import { useState, useEffect } from "react";
import { Receipt24Regular } from "@fluentui/react-icons";
import { SalesChart } from "../pos/SalesChart";
import { Props as BannerProps } from "../pos/SalesBanner";
import SalesBanner from "../pos/SalesBanner";
import moment from "moment";
import useModal from "../../hooks/useModal";
import Modal from "../modal/Modal";

const samples: BannerProps[] = [
  {
    icon: <Receipt24Regular />,
    label: "Sales",
    values: 1000000,
  }
];

export default function SalesScreen() {

  const modalProps = useModal()

  // useEffect(() => {
  //   modalProps.handleOpen()
  // }, [])
 
  return (
    <div className='p-4 grid grid-cols-4 gap-3'>
      {samples.map((sample, index) => (
        <SalesBanner
          {...sample}
          key={index}
        />
      ))}
      <div className='col-span-4 mb-5 bg-white border shadow-md border-gray-400'>
        <SalesChart />
      </div>
      <Modal 
        {...modalProps}
        dialogContent={(
          <div>
            This fired dialog
          </div>
        )}
      />
    </div>
  );
}
