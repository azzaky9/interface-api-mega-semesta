import { Receipt24Regular } from "@fluentui/react-icons"
import SalesBanner from "../pos/SalesBanner"
import { SalesChart } from "../pos/SalesChart"

export default function SalesScreen() {
  return (
    <div className="p-4 grid grid-cols-4 gap-3" >
      <SalesBanner icon={<Receipt24Regular />} label="Sales" values="10000000" variant="red"/>
      <SalesBanner icon={<Receipt24Regular />} label="Sales" values="10000000" variant="red"/>
      <SalesBanner icon={<Receipt24Regular />} label="Sales" values="10000000" variant="red"/>
      <SalesBanner icon={<Receipt24Regular />} label="Sales" values="10000000" variant="red"/>
      <div className="col-span-4 mb-5 bg-white border shadow-md border-gray-400" >
        <SalesChart />
      </div>
    </div>
  )
}


