import { Button, Card, CardHeader } from "reactstrap";
import {
  Category,
  DataRequest as MenuDataState,
  Order
} from "../../types/types";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";
import CheckboxCategory from "../forms/switches/CheckboxCategory";

type Props = {
  dataMenu: MenuDataState[];
};

export type CategoryIncAll = Category | "all";

function MenuList(props: Props) {
  const { dispatch, state } = useOrder();
  const { dataMenu } = props;

  const [filterBy, setFilterBy] = useState<CategoryIncAll>("all");

  const filterByMenu = (category: CategoryIncAll) => {
    const filteredData = dataMenu.filter((menu) => {
      return category === "all" ? menu : menu.category === category;
    });

    return filteredData;
  };

  const addOrder = (selectionMenu: Order) => {
    dispatch({
      type: "UPDATE_ORDER",
      payload: selectionMenu
    });
  };

  const deleteOrder = (orderId: string) => {
    dispatch({
      type: "DELETE_ORDER",
      payload: orderId
    });
  };

  const isMenuAtOrder = (menu: MenuDataState) => {
    return state.orderList.find((order) => order.id === menu.id) ? true : false;
  };

  console.log("[ORDER-LIST:]", state.orderList);

  const dataByCategory = filterByMenu(filterBy);

  return (
    <Card className='h-[88vh] col-span-3'>
      <CardHeader>List Menu</CardHeader>
      <CheckboxCategory
        setSelectedCategory={setFilterBy}
        selectedCategory={filterBy}
      />
      <div className='p-5 flex flex-wrap gap-3 overflow-scroll overflow-x-hidden'>
        {dataByCategory.map((menu, _) => (
          <Button
            onClick={() =>
              !isMenuAtOrder(menu)
                ? addOrder({
                    id: menu.id,
                    name: menu.name,
                    price: menu.price,
                    qty: 1
                  })
                : deleteOrder(menu.id)
            }
            className='h-fit'
            color={isMenuAtOrder(menu) ? "success" : undefined}
            outline={!isMenuAtOrder(menu)}
            key={menu.id}
          >
            {menu.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default MenuList;
