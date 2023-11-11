import {
  Category,
  DataRequest as MenuDataState,
  Order
} from "../../types/types";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";
import { CheckboxCategory } from "../forms/switches/CheckboxCategory";
import { Button, Spinner, ToastTrigger } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components";
import { ArrowHookUpLeftRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { ToastConfig, useAlert } from "../../context/ToastContext";
import { useMenu } from "../../context/MenuContext";

type Props = {
  dataMenu: MenuDataState[];
};

export type CategoryIncAll = Category | "all";

function MenuList(props: Props) {
  const { dispatch, state } = useOrder();
  const { menuDataQ } = useMenu();
  const { isLoading } = menuDataQ;
  const { dataMenu } = props;
  const navigate = useNavigate();

  const { notifyBasicAlert } = useAlert();

  const [filterBy, _] = useState<CategoryIncAll>("all");

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

  const isMenuAtOrder = (menu: MenuDataState) => {
    return state.orderList.find((order) => order.id === menu.id) ? true : false;
  };

  const backToMainDashboard = () => navigate("/");

  const dataByCategory = filterByMenu(filterBy);

  const notifyConfig: ToastConfig = {
    message: "Menu sudah dipilih",
    notifType: "warning",
    toastProps: {
      action: (
        <ToastTrigger>
          <Button
            size='small'
            appearance='subtle'
          >
            Close
          </Button>
        </ToastTrigger>
      )
    }
  };

  return (
    <div className='col-span-3 '>
      <Card className='bg-white shadow-sm h-full '>
        <div className='mb-3'>
          <CheckboxCategory />
        </div>

        <div className='h-full'>
          {isLoading ? (
            <div className='grid place-content-center h-full gap-3 '>
              <Spinner
                appearance='primary'
                label='Mengambil menu..'
              />
            </div>
          ) : (
            <div className='flex flex-wrap gap-4 overflow-scroll overflow-x-hidden max-h-[540px]'>
              {dataByCategory.map((menu, _) => (
                <Button
                  disabled={isMenuAtOrder(menu)}
                  onClick={() =>
                    !isMenuAtOrder(menu)
                      ? addOrder({
                          id: menu.id,
                          name: menu.name,
                          price: menu.price,
                          qty: 1
                        })
                      : notifyBasicAlert(notifyConfig)
                  }
                  className='h-fit rounded-sm'
                  color={isMenuAtOrder(menu) ? "success" : undefined}
                  // outline={!isMenuAtOrder(menu)}
                  key={menu.id}
                >
                  {menu.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className=''>
          <Button
            className='mt-2'
            icon={<ArrowHookUpLeftRegular />}
            iconPosition='before'
            onClick={backToMainDashboard}
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default MenuList;
