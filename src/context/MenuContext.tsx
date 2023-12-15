import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Category, TSetStates } from "../types/types";
import { useQuery, UseQueryResult } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import { DataRequest as MenuSchema } from "../types/types";
import type { Item as MenuRowsItem } from "../components/tables/TableMenu";

type DocMenuResponse = {
  list_menu: MenuSchema[];
};

// type MenuDataState = MenuDataTypes | null;

type AddNewMenuForm = {
  name: string;
  category: Category;
  groupMenu: string;
  price: number;
};

export interface MenuEditableSchema extends MenuSchema {
  no: number;
  isSelect: boolean;
}

export interface MenuState {
  nodes: MenuEditableSchema[];
}

type MenuInitialCtx = {
  menuData: MenuState | null;
  setMenuData: TSetStates<MenuState | null>;
  formUtilities: UseFormReturn<AddNewMenuForm, any, undefined>;
  menuDataQ: UseQueryResult<DocMenuResponse[] | undefined, unknown>;
  deletingMenus: MenuRowsItem[];
  setDeletingMenus: TSetStates<MenuRowsItem[]>;
};

const MenuContext = createContext({} as MenuInitialCtx);

type PropsMenuProvider = {
  children: React.ReactNode;
};

const MenuProvider: React.FC<PropsMenuProvider> = ({ children }) => {
  const [menuData, setMenuData] = useState<MenuState | null>(null);
  const [deletingMenus, setDeletingMenus] = useState<MenuRowsItem[]>([]);

  const formUtilities = useForm<AddNewMenuForm>({
    defaultValues: {
      category: "foods",
      groupMenu: "Incharge"
    }
  });

  const menuDataQ = useQuery({
    queryKey: ["list-menu"],
    queryFn: async () => {
      try {
        const collectionRef = collection(db, "menu_collection");

        const querySnapshot = await getDocs(collectionRef);

        const getDataFromSnapshot = querySnapshot.docs.flatMap((doc, _) => {
          if (!doc.exists()) throw new Error("one of the document not exist");

          return doc.data() as DocMenuResponse;
        });

        const data = getDataFromSnapshot;

        const nodes = data
          ?.flatMap((d) => {
            return d?.list_menu;
          })
          .map((a, index) => ({
            ...a,
            no: index + 1,
            isSelect: false
          })) as MenuEditableSchema[];

        setMenuData({ nodes });

        return getDataFromSnapshot;
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: Infinity
  });

  const initiialValue = {
    menuData,
    setMenuData,
    formUtilities,
    menuDataQ,
    deletingMenus,
    setDeletingMenus
  };

  return (
    <MenuContext.Provider value={initiialValue}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => useContext(MenuContext);

export { MenuProvider, useMenu, type Category, type AddNewMenuForm };
