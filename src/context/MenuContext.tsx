import { createContext, useContext, useState } from "react";

type MenuInitialCtx = {
  orderType: "incharge" | "hotel_guest";
  category: Category ;
};

type Category =
  | "all"
  | "foods"
  | "baverage"
  | "minibar"
  | "gelora"
  | "store"
  | "rokok";

const MenuContext = createContext({} as any)

type PropsMenuProvider = {
  children: React.ReactNode
}

const MenuProvider: React.FC<PropsMenuProvider> = ({ children }) => {
  const [menuData, setMenuData] = useState() 


  return (
    <MenuContext.Provider value={{}} >
      {children}
    </MenuContext.Provider>
  )
}

const useMenu = useContext(MenuContext)

export { useMenu, type Category }