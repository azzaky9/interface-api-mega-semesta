import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Category, TSetStates } from "../types/types";
import { DataRequest as MenuDataTypes } from "../types/types";

type MenuDataState = MenuDataTypes | null;

type AddNewMenuForm = {
  name: string;
  category: Category;
  groupMenu: string;
  price: number
};

type MenuInitialCtx = {
  menuData: MenuDataTypes | null;
  setMenuData: TSetStates<MenuDataState>;
  formUtilities: UseFormReturn<AddNewMenuForm, any, undefined>;
};

const MenuContext = createContext({} as MenuInitialCtx);

type PropsMenuProvider = {
  children: React.ReactNode;
};

const MenuProvider: React.FC<PropsMenuProvider> = ({ children }) => {
  const formUtilities = useForm<AddNewMenuForm>({
    defaultValues: {
      category: "foods",
      groupMenu: "Incharge"
    }
  });

  const [menuData, setMenuData] = useState<MenuDataState>(null);

  const initiialValue = {
    menuData,
    setMenuData,
    formUtilities,
  };

  console.log(formUtilities.watch("groupMenu"));

  return (
    <MenuContext.Provider value={initiialValue}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => useContext(MenuContext);

export { MenuProvider, useMenu, type Category, type AddNewMenuForm };
