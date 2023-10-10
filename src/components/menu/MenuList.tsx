import { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useSources } from "../../hooks/useSources";

const dummyMenu = [
  { id: "0", name: "Nugget Goreng", isChoosen: false, qty: 0 },
  { id: "1", name: "Nasi Liwet", isChoosen: false, qty: 0 },
  { id: "2", name: "Aqua Botol", isChoosen: false, qty: 0 },
  { id: "3", name: "Nasi Goreng Spc", isChoosen: false, qty: 0 },
  { id: "4", name: "Nasi Goreng Telur", isChoosen: false, qty: 0 }
];

function MenuList() {
  const { getValueOfCollection } = useSources();

  const [dataMenu, setDataMenu] = useState(dummyMenu);

  const chooseMenuById = (menuId: string) => {
    const copyDataMenu = [...dataMenu];

    const modifiedMenu = copyDataMenu.map((menu) => {
      if (menuId === menu.id) {
        return {
          ...menu,
          isChoosen: !menu.isChoosen,
          qty: menu.isChoosen ? 0 : 1
        };
      }

      return { ...menu };
    });

    setDataMenu(modifiedMenu);
  };

  getValueOfCollection()

  return (
    <div>
      <Card>
        <CardHeader>List Menu</CardHeader>
        <CardBody>
          <div className='flex gap-3 flex-wrap'>
            {dataMenu.map((menu, index) => (
              <span
                onClick={() => chooseMenuById(menu.id)}
                className={`px-3 py-2 border-2 text-sm border-gray-200 hover:cursor-pointer rounded-md ${
                  menu.isChoosen ? " border-blue-500" : ""
                }`}
                key={index}
              >
                {menu.name}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default MenuList;
