import * as React from "react";
import {
  Category,
  DataRequest as MenuDataState,
  Order
} from "../../types/types";
import { useOrder } from "../../context/OrderContext";
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

type DefaultRecord = Record<string, string[]>;

export type CategoryIncAll = Category | "all";

function MenuList(props: Props) {
  const { notifyBasicAlert } = useAlert();
  const { dispatch, state } = useOrder();
  const { menuDataQ } = useMenu();
  const navigate = useNavigate();

  const { isLoading } = menuDataQ;
  const { dataMenu } = props;

  const defaultCategory = ["foods", "rokok", "baverage", "store"];

  const [savedPrefference, setSavePrefference] = React.useState<DefaultRecord>({
    category: defaultCategory
  });
  const [checkedValues, setCheckedValues] = React.useState<DefaultRecord>({
    category: defaultCategory
  });

  const filterByMenu = (category: string[]) => {
    console.log(checkedValues);

    const filteredData = dataMenu.filter((menu) => {
      return category.includes(menu.category);
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

  const dataByCategory = filterByMenu(savedPrefference.category as string[]);

  console.log(dataByCategory);

  const savePrefference = () => {
    if (checkedValues.category.length === 0) {
      const createConfig: ToastConfig = {
        message: "Minimal harus memilih 1 dari category",
        notifType: "info",
        toastProps: {
          className: "text-sm text-gray-800"
        }
      };

      return notifyBasicAlert(createConfig);
    }

    const createSuccessConfig: ToastConfig = {
      message: "Save prefference",
      notifType: "success",
      toastProps: {
        className: "text-sm text-gray-800"
      }
    };

    notifyBasicAlert(createSuccessConfig);

    setSavePrefference({ category: checkedValues.category as string[] });
  };

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
          <CheckboxCategory
            setter={setCheckedValues}
            value={checkedValues}
            savePrefference={savePrefference}
            savedCategory={savedPrefference}
          />
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
