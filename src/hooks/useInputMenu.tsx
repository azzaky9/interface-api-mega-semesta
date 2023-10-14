import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import { DataRequest } from "../types/types";
import { v4 as uuid } from "uuid";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";

type InsertEnumType = "foods" | "baverage" | "minibar" | "etc";

type RequestRequirementArg = {
  insertType: InsertEnumType;
  data: DataRequest;
};

type RequestDeleteArg = {
  deleteFromList: InsertEnumType;
  id: string;
};

const useInputMenu = () => {
  const generateUniqueId = () => {
    const uid = uuid().split("-")[0];

    console.log(uid);
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

  const deleteMenu = useMutation({
    mutationKey: ["delete-menu"],
    mutationFn: async (dataDelete: RequestDeleteArg) => {
      try {
        const ref = doc(db, "menu_collection", dataDelete.deleteFromList);

        await updateDoc(ref, {
          list_menu: arrayRemove({
            id: dataDelete.id
          })
        });

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

  // on development

  return { insertMenu, deleteMenu, generateUniqueId };
};

export default useInputMenu;
