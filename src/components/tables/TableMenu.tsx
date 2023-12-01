import * as React from "react";

import {
  PresenceBadgeStatus,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableSelectionCell,
  TableCellLayout,
  TableColumnDefinition,
  useTableSelection,
  createTableColumn,
  useTableFeatures
} from "@fluentui/react-components";
import Pagination from "./Pagination";
import { useMenu } from "../../context/MenuContext";
import RenderHeaderCells from "./RenderHeaderCells";

type Props = {
  searchTerm: string;
};

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file"
  }),
  createTableColumn<Item>({
    columnId: "author"
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated"
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate"
  })
];

const MainTable = () => {
  const {
    getRows,
    selection: {
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow,
      isRowSelected
    }
  } = useTableFeatures(
    {
      columns,
      items
    },
    [
      useTableSelection({
        selectionMode: "multiselect",
        defaultSelectedItems: new Set([0, 1])
      })
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ("brand" as const) : ("none" as const)
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " ") {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows]
  );

  const headerCells: string[] = [
    "#",
    "name",
    "price",
    "Admin",
    "Last Updated",
    "Last Update"
  ];

  return (
    <Table
      aria-label='Table with multiselect'
      className='bg-white'
    >
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={
              allRowsSelected ? true : someRowsSelected ? "mixed" : false
            }
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ "aria-label": "Select all rows " }}
          />
          <RenderHeaderCells titles={headerCells} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              checked={selected}
              checkboxIndicator={{ "aria-label": "Select row" }}
            />
            <TableCell>
              <TableCellLayout media={item.file.icon}>
                {item.file.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>
                {item.lastUpdate.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TableMenu = (_: Props) => {
  // const { formatToIdrCurrency } = useCurrency();
  const { menuDataQ,  } = useMenu();

  // const { searchTerm } = props;

  const { isError, isLoading, isRefetching } = menuDataQ;

  if (isLoading || isRefetching) <p>Loading...</p>;

  if (isError) <p>some error occurred.</p>;

  return (
    <>
      <MainTable />
      <Pagination />
    </>
  );
};

export default TableMenu;
