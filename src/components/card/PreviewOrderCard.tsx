import Customer from "./orders/Customer";

import OrderList from "./orders/OrderList";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  Card
} from "@fluentui/react-components";
import {
  FoodRegular,
  PersonRegular,
  ReceiptRegular
} from "@fluentui/react-icons";

export default function PreviewOrderCard() {
  return (
    <Card className='col-span-2 me-4'>
      <div className='bg-white'>Detail Order</div>
      <OrderList />
      <Customer />
      <div className='bg-white py-4 flex justify-end'>
        <MenuListPrintOption />
      </div>
    </Card>
  );
}

function MenuListPrintOption() {
  return (
    <Menu>
      <MenuTrigger>
        <Button
          icon={<ReceiptRegular />}
          iconPosition='after'
          appearance='primary'
        >
          Print Receipt
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader className='text-sm'>Opsi Print</MenuGroupHeader>
            <MenuItem icon={<PersonRegular />}> Customer</MenuItem>
            <MenuItem icon={<FoodRegular />}> Kitchen</MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
