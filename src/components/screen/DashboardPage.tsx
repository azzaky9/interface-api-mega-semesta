import OrderForm from "../forms/OrderForm"
import MenuList from "../menu/MenuList"

export default function DashboardPage() {
  
  return (
    <div className="flex gap-4" >
      <OrderForm />
      <MenuList />
    </div>
  )
}
