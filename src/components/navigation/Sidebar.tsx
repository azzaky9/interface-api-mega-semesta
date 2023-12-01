import { useCallback, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Divider, MenuItem, MenuList, Text } from "@fluentui/react-components";
import {
  TextBulletList20Regular,
  BoxEdit20Regular,
  Food24Regular,
  ArrowTrendingLines24Regular
} from "@fluentui/react-icons";

const sidebarMenu = [
  {
    directTo: "/",
    icons: <TextBulletList20Regular />,
    text: "Dashboard"
  },
  {
    directTo: "/stock",
    icons: <BoxEdit20Regular />,
    text: "Stock"
  },
  {
    directTo: "/menu",
    icons: <Food24Regular />,
    text: "Menu"
  },
  {
    directTo: "/sales",
    icons: <ArrowTrendingLines24Regular />,
    text: "Sales"
  }
];

function Sidebar() {
  const { pathname } = useLocation();

  const renderSymbol = useCallback(
    () => (
      <div className='flex gap-3 justify-center items-center border-b border-gray-200'>
        <h1 className='text-center text-2xl font-bold my-4'>NUSANCAFE</h1>
      </div>
    ),
    []
  );

  const brands = renderSymbol();

  return (
    <aside className='w-[230px] bg-white border-r-2 border-gray-400  shadow-xl'>
      {brands}
      <Divider />
      <div className='flex gap-3 flex-col justify-center items-center'>
        <MenuList className='w-full '>
          {sidebarMenu.map((item, index) => (
            <NavLink
              to={item.directTo}
              key={index}
            >
              <MenuItem
                className={`py-3 ${
                  item.directTo === pathname ? "bg-gray-100" : ""
                } `}
              >
                <div className='grid grid-cols-5 '>
                  <div className='col-span-1 px-2'>{item.icons}</div>
                  <Text
                    className='col-span-4'
                    as='h5'
                  >
                    {item.text}
                  </Text>
                </div>
              </MenuItem>
              <Divider />
            </NavLink>
          ))}
        </MenuList>
      </div>
    </aside>
  );
}

export default memo(Sidebar)