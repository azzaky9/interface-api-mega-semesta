import { CompactTable } from "@table-library/react-table-library/compact";

const nodes = [
  {
    id: "0",
    no: 0,
    name: "Nasi Goreng Special",
    tipe: "hotel",
    testing: "hasil",
    category: "Foods",
    price: "20k"
  },
  {
    id: "0",
    no: 0,
    name: "Nasi Goreng Special",
    tipe: "incharge",
    testing: "hasil",
    category: "Foods",
    price: "20k"
  },
  {
    id: "0",
    no: 0,
    name: "Nasi Goreng Special",
    tipe: "hotel",
    testing: "hasil",
    category: "Foods",
    price: "20k"
  }
];

type DataRender = {
  label: string;
  renderCell: (item: (typeof nodes)[0]) => any;
};

const COLUMNS: DataRender[] = [
  { label: "#", renderCell: (item) => item.no },
  { label: "Menu", renderCell: (item) => item.name },
  { label: "Tipe", renderCell: (item) => item.tipe },
  { label: "Category", renderCell: (item) => item.category },
  { label: "Price", renderCell: (item) => item.price }
];

const TableMenu = () => {
  const data = { nodes };

  return (
    <CompactTable
      columns={COLUMNS}
      data={data}
    />
  );
};

export default TableMenu;
