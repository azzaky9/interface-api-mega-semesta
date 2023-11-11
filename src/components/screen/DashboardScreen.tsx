import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { DataRequest as MenuDataState } from "../../types/types";
import MenuList from "../menu/MenuList";
import PreviewOrderCard from "../card/PreviewOrderCard";
import { useMenu } from "../../context/MenuContext";
import { useLocation } from "react-router-dom";

export default function DashboardScreen() {
  const { dispatch } = useOrder();
  const { menuDataQ } = useMenu();

  const { data } = menuDataQ;
  const { pathname } = useLocation();

  const [menuState, setMenuState] = useState<MenuDataState[]>([]);

  useEffect(() => {
    if (data) {
      setMenuState(data?.flatMap((list) => list.list_menu));
    }
  }, [data]);

  useEffect(() => {
    if (pathname === "/") {
      dispatch({ type: "CLEAR" });
    }
  }, [pathname]);

  return (
    <div className=''>
      <div className='flex flex-col'>
        <div className='ps-10 grid pt-2  grid-cols-5 gap-x-5'>
          <MenuList dataMenu={menuState} />
          <PreviewOrderCard />
        </div>
      </div>
    </div>
  );
}
