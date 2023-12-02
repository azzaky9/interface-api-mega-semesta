import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import { DataRequest } from "../types/types";
import { v4 as uuid } from "uuid";
import { useMutation } from "react-query";
import menuHotelsJson from "../assets/menu_hotel.json";
import { Category, MenuEditableSchema, useMenu } from "../context/MenuContext";
import { useAlert } from "../context/ToastContext";
import { useState } from "react";
import useCurrency from "./useCurrency";

type RequestRequirementArg = {
  insertType: Category;
  data: DataRequest;
};

type MenuHotelSchema = {
  name: string;
  category: string;
  groupMenu: string;
  price: number;
};

const useInputMenu = () => {
  const [isResetLoading, setIsResetLoading] = useState(false);

  const { menuData, setMenuData, menuDataQ } = useMenu();
  const { notifyBasicAlert } = useAlert();
  const { deletingMenus, setDeletingMenus } = useMenu()
  const { formatToNumber } = useCurrency()

  const generateUniqueId = () => {
    const uid = uuid().split("-")[0];

    return uid;
  };

  const insertMenu = useMutation({
    mutationKey: ["newMenu"],
    mutationFn: async (requestData: RequestRequirementArg) => {
      try {
        const ref = doc(db, "menu_collection", requestData.insertType);

        await updateDoc(ref, {
          list_menu: arrayUnion(requestData.data)
        });

        notifyBasicAlert({
          message: "Menu created",
          notifType: "success"
        });
      } catch (error) {
        notifyBasicAlert({
          message: "Failed to create",
          notifType: "error"
        });

        console.log(error);
      }
    }
  });

  const deleteMenuByCategory = async (data: DataRequest) => {
    const docRef = doc(db, "menu_collection", data.category);

    await updateDoc(docRef, {
      list_menu: arrayRemove(data)
    });
  };

  const deleteMenu = useMutation({
    mutationKey: ["delete-menu"],
    mutationFn: async () => {
      try {
        if (deletingMenus.length === 0) return

        for (let index = 0; index < deletingMenus.length; index++) {
          const dataToDelete = deletingMenus[index];

          deleteMenuByCategory({
            category: dataToDelete.category.label,
            groupMenu: dataToDelete.groupMenu.label,
            id: dataToDelete.id,
            name: dataToDelete.name.label,
            price: formatToNumber(dataToDelete.price.label)
          });
        }

        menuDataQ.refetch();

        notifyBasicAlert({
          message: "Complete to delete.",
          notifType: "success"
        });

        setDeletingMenus([])
      } catch (error) {
        notifyBasicAlert({
          notifType: "error",
          message: "Failed to delete, some error occured."
        });

        console.error(error);
      }
    }
  });

  const binduidtoArr = (datatoBind: MenuHotelSchema[]) => {
    const afterBind = datatoBind.map((data) => {
      return { id: generateUniqueId(), ...data };
    });

    return afterBind;
  };

  // developer purpose dont delete this please, for handle bad scenario in the future
  const addManyMenuFromJson = useMutation({
    mutationKey: ["adding-many-menu"],
    mutationFn: async () => {
      try {
        const insertMenus = async (values: MenuHotelSchema[], key: string) => {
          const ref = doc(db, "menu_collection", key);

          const bindidEach = binduidtoArr(values);

          await updateDoc(ref, {
            list_menu: bindidEach
          });
        };

        Object.entries(menuHotelsJson).forEach(([key, value]) => {
          insertMenus(value, key);
        });
        const docsRef = doc(db, "menu_collection", "foods");
        const baverageRef = doc(db, "menu_collection", "baverage");

        const bindIdBaverage = menuHotelsJson.baverage.map((value) => {
          return { id: generateUniqueId(), ...value };
        });

        await updateDoc(baverageRef, {
          list_menu: bindIdBaverage
        });

        const bindIdFoods = menuHotelsJson.foods.map((value) => {
          return { id: generateUniqueId(), ...value };
        });

        await updateDoc(docsRef, {
          list_menu: bindIdFoods
        });

        console.log("success to create all");
      } catch (error) {
        console.error(error);
      }
    }
  });

  const resetAllSelection = () => {
    setIsResetLoading(true);

    const resettingAll = menuData?.nodes.map((item) => {
      return { ...item, isSelect: false };
    }) as unknown;

    setMenuData({ nodes: resettingAll as MenuEditableSchema[] });

    setIsResetLoading(false);
  };

  // on development

  return {
    insertMenu,
    deleteMenu,
    generateUniqueId,
    addManyMenuFromJson,
    resetAllSelection,
    isResetLoading
  };
};

export default useInputMenu;
