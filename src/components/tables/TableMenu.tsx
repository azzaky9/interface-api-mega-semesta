import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import useCurrency from "../../hooks/useCurrency";
import Pagination from "./Pagination";
import { MenuEditableSchema, useMenu } from "../../context/MenuContext";
import { ChangeEvent } from "react";
import Loader from "../utils/Loader";
import { Card, Checkbox } from "@fluentui/react-components";

type DataRender = {
  label: string;
  renderCell: (item: MenuEditableSchema) => any;
};

type Props = {
  searchTerm: string;
};

const TableMenu = (props: Props) => {
  const { formatToIdrCurrency } = useCurrency();
  const { menuDataQ, menuData, setMenuData } = useMenu();

  const { searchTerm } = props;

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: repeat(4, 1fr);
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
            <Checkbox
              checked={item.isSelect}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleUpdate(event.target.checked, item.id, "isSelect");
              }}
            />
          </div>
        );
      }
    }
  ];

  const datas = {
    nodes: menuData?.nodes.filter((node) =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

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

  React.useEffect(() => {
    if (pagination.state.page !== 0) {
      pagination.fns.onSetPage(0);
    }
  }, [searchTerm]);

  if (isLoading || isRefetching) <p>Loading...</p>;

  if (isError) <p>some error occurred.</p>;

  return (
    <>
      <div
        className='overflow-x-hidden shadow-md bg-white rounded-md'
        style={{ height: "78vh", overflow: "scroll" }}
      >
        <Card>
          {datas && menuData ? (
            <CompactTable
              columns={COLUMNS}
              data={datas}
              theme={theme}
              pagination={pagination}
            />
          ) : null}
        </Card>
        {isLoading || isRefetching ? <Loader /> : null}
      </div>
      <Pagination
        dataNodes={datas.nodes ? datas.nodes : []}
        pagination={pagination}
      />
    </>
  );
};

export default TableMenu;
