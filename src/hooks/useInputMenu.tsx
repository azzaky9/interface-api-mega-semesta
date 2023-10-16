import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import { DataRequest } from "../types/types";
import { v4 as uuid } from "uuid";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import menuHotelsJson from "../assets/menu_hotel.json";
import { useMenu } from "../context/MenuContext";

export type InsertEnumType = "foods" | "baverage" | "minibar" | "etc";

type RequestRequirementArg = {
  insertType: InsertEnumType;
  data: DataRequest;
};

type MenuHotelSchema = {
  name: string;
  category: string;
  groupMenu: string;
  price: number;
};

// type RequestDeleteArg = {
//   deleteFromList: InsertEnumType;
// };

const useInputMenu = () => {
  const { menuData } = useMenu();

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

        enqueueSnackbar({
          variant: "success",
          message: "Success to add new menu"
        });
      } catch (error) {
        enqueueSnackbar({
          variant: "error",
          message: "Failed to adding, some error ocurred."
        });

        console.log(error);
      }
    }
  });

  const getSelectionMenu = () => {
    const selections = menuData?.nodes.map((node) => {
      const { category, groupMenu, id, name, price, isComplete } = node;

      if (isComplete) {
        return { category, groupMenu, id, name, price };
      }
    }) as DataRequest[];

    return selections.filter((selection) => selection);
  };

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
        const selectionMenu = getSelectionMenu();

        for (let index = 0; index < selectionMenu.length; index++) {
          const dataToDelete = selectionMenu[index];

          deleteMenuByCategory(dataToDelete);
        }

        console.log("[selection]", selectionMenu);

        enqueueSnackbar({
          variant: "success",
          message: "Complete to delete."
        });
      } catch (error) {
        enqueueSnackbar({
          variant: "error",
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

  // on development

  return { insertMenu, deleteMenu, generateUniqueId, addManyMenuFromJson };
};

export default useInputMenu;
