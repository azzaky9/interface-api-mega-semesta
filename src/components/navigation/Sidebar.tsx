import { Package2, LayoutDashboard, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarMenu = [
  {
    directTo: "/",
    icons: <LayoutDashboard size={19} />,
    text: "Main dashboard"
  },
  {
    directTo: "/stock",
    icons: <Package2 size={19} />,
    text: "Manage Stock"
  },
  {
    directTo: "/menu",
    icons: <Utensils size={19} />,
    text: "Menu"
  }
];

export default function Sidebar() {
  const renderSymbol = (
    <div className='flex gap-3 justify-center items-center border-b border-gray-200'>
      <h1 className='text-center text-2xl font-bold my-4'>NUSANCAFE </h1>
    </div>
  );

  return (
    <aside className='w-[320px]  bg-   border border-gray-100'>
      {renderSymbol}
      <div className='flex mt-3 gap-3 flex-col justify-center items-center'>
        {sidebarMenu.map((menu, index) => (
          <ButtonSidebar
            key={index}
            {...menu}
          />
        ))}
      </div>
    </aside>
  );
}

interface TPropButtonSidebar {
  text: string;
  icons: JSX.Element;
  directTo: string;
}

const ButtonSidebar: React.FC<TPropButtonSidebar> = (prop) => {
  const { text, icons, directTo } = prop;

  return (
    <NavLink
      to={directTo}
      className={({ isActive }) =>
        ` ${
          isActive ? "bg-blue-500 shadow-sm shadow-blue-300 text-white" : ""
        } text-start w-[90%] mx-3 font-normal px-3 py-2.5 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white hover:shadow-sm hover:shadow-blue-300 text-md`
      }
    >
      <div className='flex gap-3 items-center'>
        {icons}
        <span className='text-lg'>{text}</span>
      </div>
    </NavLink>
  );
};
