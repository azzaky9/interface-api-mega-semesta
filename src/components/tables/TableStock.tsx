import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderCell,
  TableCell
} from "@fluentui/react-components";
import { FixedSizeList as List } from "react-window";
import {
  DownloadTableExcel,
  useDownloadExcel
} from "react-export-table-to-excel";

type StockDefinition = {
  name: string;
  insertBy: string;
  edittedBy: string;
  currentStock: number;
};

type InfoStock = {
  insertValue: number;
  outValue: number;
  remainderValue: number;
};

type Stocks = {
  definitonStock: StockDefinition;
  infoStock: InfoStock;
};

const defaultData: Stocks[] = [
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  },
  {
    definitonStock: {
      edittedBy: "Admin  1",
      insertBy: "Admin 2",
      name: "Emping Sambal",
      currentStock: 19
    },
    infoStock: {
      insertValue: 20,
      outValue: 1,
      remainderValue: 19
    }
  }
];

const columnHelper = createColumnHelper<Stocks>();

const columns = [
  columnHelper.group({
    id: "stock_definition",
    header: () => <span className='text-center mx-auto'>Stock Def</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("definitonStock.name", {
        cell: (info) => info.getValue(),
        header: () => <span>Stock Name</span>,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor((row) => row.definitonStock.insertBy, {
        id: "insert_by",
        cell: (info) => info.getValue(),
        header: () => <span>Insert By</span>,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor((row) => row.definitonStock.edittedBy, {
        id: "editted_by",
        cell: (info) => info.getValue(),
        header: () => <span>Editted By</span>,
        footer: (props) => props.column.id
      }),
      columnHelper.accessor((row) => row.definitonStock.currentStock, {
        id: "current_stock",
        cell: (info) => info.getValue(),
        header: () => <span>Current Stock</span>,
        footer: (props) => props.column.id
      })
    ]
  }),
  columnHelper.group({
    id: "info",
    header: () => <span className='text-center mx-auto'>Info</span>,
    footer: (props) => props.column.id,
    columns: [
      columnHelper.group({
        id: "detail_stock",
        header: () => <span>Detail Stock</span>,
        columns: [
          columnHelper.accessor("infoStock.insertValue", {
            header: () => <span>Masuk</span>,
            footer: (props) => props.column.id
          }),
          columnHelper.accessor("infoStock.outValue", {
            header: "Keluar",
            footer: (props) => props.column.id
          }),
          columnHelper.accessor("infoStock.remainderValue", {
            header: "Sisa",
            footer: (props) => props.column.id
          })
        ]
      })
    ]
  })
];

export default function TableStock() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const tableRef = React.useRef<HTMLTableElement | null>(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "test_sheet",
    sheet: "sheet"
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  console.log(tableRef.current);

  return (
    <div className='bg-white h-[82vh] flex flex-col justify-between'>
      <div className='p-2 bg-white w-full'>
        <Table
          as='table'
          ref={tableRef}
          className='h-[92%]'
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='h-[90%]'>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                className=''
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='py-4'>
        <button onClick={onDownload}>Export To Excel</button>
      </div>
    </div>
  );
}
