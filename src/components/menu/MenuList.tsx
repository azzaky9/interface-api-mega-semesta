import * as React from "react";
import {
  Category,
  DataRequest as MenuDataState,
  Order
} from "../../types/types";
import { useOrder } from "../../context/OrderContext";
import { ToolbarActions } from "../forms/switches/ToolbarActions";
import { Button, ToastTrigger } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components";
import { ArrowHookUpLeftRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { ToastConfig, useAlert } from "../../context/ToastContext";
import { useMenu } from "../../context/MenuContext";
import Loader from "../utils/Loader";
import type { Props as ToolbarProps } from "../forms/switches/ToolbarActions";
import ResultSearch from "./ResultSearch";

type Props = {
  dataMenu: MenuDataState[];
};

type DefaultRecord = Record<string, string[]>;

export type CategoryIncAll = Category | "all";

function MenuList(props: Props) {
  const { notifyBasicAlert } = useAlert();

  const { menuDataQ } = useMenu();
  const navigate = useNavigate();

  const { isLoading } = menuDataQ;
  const { dataMenu } = props;

  const defaultCategory = ["foods", "rokok", "baverage", "store"];

  // the saved state used to filter the data
  const [savedPrefference, setSavePrefference] = React.useState<DefaultRecord>({
    category: defaultCategory
  });

  // the checkedValue State used to handle checkbox change
  const [checkedValues, setCheckedValues] = React.useState<DefaultRecord>({
    category: defaultCategory
  });

  const [search, setSearch] = React.useState("");
  const defferredValue = React.useDeferredValue(search);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterByMenu = (category: string[]) => {
    console.log(checkedValues);

    const filteredData = dataMenu.filter((menu) => {
      return category.includes(menu.category);
    });

    return filteredData;
  };

  const backToMainDashboard = () => navigate("/");

  const dataByCategory = filterByMenu(savedPrefference.category as string[]);

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

  // props for controlling the menu
  const toolbarProps: ToolbarProps = {
    handleSearch: onSearchChange,
    savedCategory: savedPrefference,
    savePrefference: savePrefference,
    search,
    setter: setCheckedValues,
    value: checkedValues
  };

  return (
    <div className='col-span-3 '>
      <Card className='bg-white shadow-sm h-full '>
        <div className='mb-3'>
          <ToolbarActions {...toolbarProps} />
        </div>

        <div className='h-full'>
          {isLoading ? (
            <Loader />
          ) : search ? (
            <ResultSearch
              searchTerm={defferredValue}
              dataMenu={dataMenu}
            />
          ) : (
            <Menus data={dataByCategory} />
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

type TPropsMenuItem = {
  menuData: MenuDataState;
  handleClick: (menu: MenuDataState) => void;
  disabled: boolean;
};

type TPropsMenus = {
  data: MenuDataState[];
};

function Menus(props: TPropsMenus) {
  const { dispatch, state } = useOrder();
  const { notifyBasicAlert } = useAlert();

  const { data } = props;

  const addOrder = (selectionMenu: Order) => {
    dispatch({
      type: "UPDATE_ORDER",
      payload: selectionMenu
    });
  };

  const isMenuAtOrder = (menu: MenuDataState) => {
    return state.orderList.find((order) => order.id === menu.id) ? true : false;
  };

  const handleClick = (menu: MenuDataState) => {
    // Error config when already selected
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

    if (!isMenuAtOrder(menu)) {
      return addOrder({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        qty: 1
      });
    }

    notifyBasicAlert(notifyConfig);
  };

  return (
    <div className='flex flex-wrap gap-4 overflow-scroll overflow-x-hidden max-h-[540px]'>
      {data.map((menu, _) => (
        <MenuItem
          disabled={isMenuAtOrder(menu)}
          handleClick={() => handleClick(menu)}
          menuData={menu}
          key={menu.id}
        />
      ))}
    </div>
  );
}

function MenuItem(props: TPropsMenuItem) {
  const { disabled, handleClick, menuData } = props;

  return (
    <Button
      disabled={disabled}
      onClick={() => handleClick(menuData)}
      className='h-fit rounded-sm'
      key={menuData.id}
    >
      {menuData.name}
    </Button>
  );
}

export default MenuList;

export type { TPropsMenuItem, TPropsMenus };

export { Menus, MenuItem };
