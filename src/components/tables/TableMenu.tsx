import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import useCurrency from "../../hooks/useCurrency";
import { Input, Spinner } from "reactstrap";
import Pagination from "./Pagination";
import { MenuEditableSchema, useMenu } from "../../context/MenuContext";
import { ChangeEvent } from "react";

type DataRender = {
  label: string;
  renderCell: (item: MenuEditableSchema) => any;
};

const TableMenu = () => {
  const { formatToIdrCurrency } = useCurrency();
  // const { deleteMenu } = useInputMenu();
  const { menuDataQ, menuData, setMenuData } = useMenu();

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 44px 40% repeat(3, 1fr);
      `
    }
  ]);

  const { isError, isLoading, isRefetching } = menuDataQ;

  const handleUpdate = (
    value: any,
    id: string,
    property: keyof MenuEditableSchema
  ) => {
    setMenuData((state) =>
      state
        ? {
            ...state,
            nodes: state.nodes.map((node) => {
              if (node.id === id) {
                return { ...node, [property]: value };
              } else {
                return node;
              }
            })
          }
        : null
    );
  };

  const COLUMNS: DataRender[] = [
    { label: "#", renderCell: (item) => item.no },
    { label: "Nama Menu", renderCell: (item) => item.name },
    { label: "Kategori", renderCell: (item) => item.category },
    { label: "Harga", renderCell: (item) => formatToIdrCurrency(item.price) },
    {
      label: "Delete",
      renderCell: (item) => {
        // const { handleChange, isActive, setIsActive } = useSwitch();

        return (
          <div className='w-[44px] grid place-content-center'>
            <Input
              checked={item.isSelect}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleUpdate(event.target.checked, item.id, "isSelect");
              }}
              type='checkbox'
              className='my-3 border-gray-400 hover:cursor-pointer'
            />
          </div>
        );
      }
    }
  ];

  const datas = { nodes: menuData?.nodes };

  // @ts-ignore
  const pagination = usePagination(datas, {
    state: {
      page: 0,
      size: 20
    },
    onChange: (action, state) => {
      console.log(action, state);
    }
  });

  if (isLoading || isRefetching) <p>Loading...</p>;

  if (isError) <p>some error occurred.</p>;

  return (
    <>
      <div
        className='overflow-x-hidden shadow-md bg-white rounded-md'
        style={{ height: "78vh", overflow: "scroll" }}
      >
        <div>
          {datas && menuData ? (
            <CompactTable
              columns={COLUMNS}
              data={datas}
              theme={theme}
              layout={{ custom: true, fixedHeader: true }}
              pagination={pagination}
            />
          ) : null}
        </div>
        {isLoading || isRefetching ? <CenterLoadingIndicator /> : null}
      </div>
      <Pagination
        dataNodes={datas.nodes ? datas.nodes : []}
        pagination={pagination}
      />
    </>
  );
};

const CenterLoadingIndicator = () => {
  return (
    <div className='w-full h-full grid place-content-center'>
      <Spinner color='dark' />
    </div>
  );
};

export default TableMenu;
