import { collection, getFirestore, doc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { app } from "../configs/firebase-config";

const useSources = () => {
  const docsRef = doc(getFirestore(app), "stock", "minibar_list");

  const [value, loading, error] = useDocument(docsRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  });

  const getValueOfCollection = () => {
    if (value) {
      const result = value.data();

      console.log(result);
    }

    if (error) {
      console.log(error);
    }
  };

  return { getValueOfCollection };
};

export { useSources };
