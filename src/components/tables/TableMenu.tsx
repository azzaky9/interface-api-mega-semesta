import { CompactTable } from "@table-library/react-table-library/compact";
import { useQuery } from "react-query";
import {  DataRequest as MenuSchema } from "../../types/types";
import { collection,  getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase-config";
import useCurrency from "../../hooks/useCurrency";
import { Button } from "reactstrap";

type DocMenuResponse = {
  list_menu: MenuSchema[];
};

interface SchemaWithNumber extends MenuSchema {
  no: number;
}

type DataRender = {
  label: string;
  renderCell: (item: SchemaWithNumber) => any;
};

// interface DataMenu extends MenuTypes {
//   groupMenu: "Tamu Hotel" | "Incharge";
// }

const TableMenu = () => {
  const { formatToIdrCurrency } = useCurrency();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-menu"],
    queryFn: async () => {
      try {
        const collectionRef = collection(db, "menu_collection");

        const querySnapshot = await getDocs(collectionRef);

        const getDataFromSnapshot = querySnapshot.docs.flatMap((doc, _) => {
          if (!doc.exists()) throw new Error("one of the document not exist");

          return doc.data() as DocMenuResponse;
        });

        console.log(getDataFromSnapshot);

        return getDataFromSnapshot;
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: 1000 * 60 * 3
  });

  const nodes = data
    ?.flatMap((d) => {
      return d?.list_menu;
    })
    .map((a, index) => ({ ...a, no: index + 1 }));

  const COLUMNS: DataRender[] = [
    { label: "#", renderCell: (item) => item.no },
    { label: "Nama Menu", renderCell: (item) => item.name },
    { label: "Kategori", renderCell: (item) => item.category },
    { label: "Harga", renderCell: (item) => formatToIdrCurrency(item.price) },
    {
      label: "Action",
      renderCell: (_) => <Button color='danger'>Delete</Button>
    }
  ];

  const datas = { nodes };

  console.log(datas);

  if (isLoading) (<p>Loading...</p>);

  if (isError) (<p>some error occurred.</p>)

  return (
    <>
      {datas && nodes ? (
        <CompactTable
          columns={COLUMNS}
          data={datas}
        />
      ) : null}
    </>
  );
};

export default TableMenu;
