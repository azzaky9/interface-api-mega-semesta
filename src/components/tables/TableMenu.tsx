import * as React from "react";

import {
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
import { Category, useMenu } from "../../context/MenuContext";
import RenderHeaderCells from "./RenderHeaderCells";
import {
  Cart24Regular,
  DrinkBeer24Regular,
  DrinkToGo24Regular,
  FoodChickenLeg24Regular,
  Money24Regular
} from "@fluentui/react-icons";
import useCurrency from "../../hooks/useCurrency";

type Props = {
  searchTerm: string;
};

type NumberCells = {
  label: string;
};

type NameCells = {
  label: string;
};

type CategoryCells = {
  label: Category;
  icon: JSX.Element;
};

type GroupCells = {
  label: string;
};

type PriceCells = {
  label: string;
  icon: JSX.Element;
};

export type Item = {
  id: string;
  no: NumberCells;
  name: NameCells;
  category: CategoryCells;
  groupMenu: GroupCells;
  price: PriceCells;
};

const headerCells: string[] = ["Menu Name", "price", "Category"];

const columns: TableColumnDefinition<Item>[] = headerCells.map((cell) =>
  createTableColumn<Item>({
    columnId: cell
  })
);

type TPropsMainTable = {
  filterBy: string;
};

const MainTable: React.FC<TPropsMainTable> = ({ filterBy }) => {
  const { menuData, deletingMenus, setDeletingMenus } = useMenu();
  const { formatToIdrCurrency } = useCurrency();

  const matchTables = () => {
    const hashIconCategory = {
      baverage: <DrinkToGo24Regular />,
      foods: <FoodChickenLeg24Regular />,
      minibar: <DrinkBeer24Regular />,
      rokok: <div />,
      store: <Cart24Regular />
    };

    const resultMatcher = menuData
      ? menuData.nodes
          .map((item, index) => {
            const result: Item = {
              id: item.id,
              no: { label: `${index + 1}` },
              name: { label: item.name },
              category: {
                label: item.category,
                icon: hashIconCategory[item.category]
              },
              groupMenu: { label: item.groupMenu },
              price: {
                label: formatToIdrCurrency(item.price),
                icon: <Money24Regular />
              }
            };

            return result;
          })
          .filter((item) => {
            return filterBy
              ? item.name.label.toLowerCase().includes(filterBy.toLowerCase())
              : item;
          })
      : [];

    return resultMatcher;
  };

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
      items: matchTables()
    },
    [
      useTableSelection({
        selectionMode: "multiselect",
        defaultSelectedItems: new Set([])
      })
    ]
  );

  const hasIdInsideDeleting = (itemToSearch: Item) => {
    return deletingMenus.some((menu) => menu.id === itemToSearch.id);
  };

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    const insideDeleting = hasIdInsideDeleting(row.item);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => {
        toggleRow(e, row.rowId);

        if (!selected) {
          setDeletingMenus((prev) => [...prev, row.item]);
        } else {
          setDeletingMenus((prev) =>
            [...prev].filter((a) => a.id !== row.item.id)
          );
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: insideDeleting ? ("brand" as const) : ("none" as const)
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
            key={item.name.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              checked={hasIdInsideDeleting(item)}
              checkboxIndicator={{ "aria-label": "Select row" }}
            />
            <TableCell
              role='gridcell'
              className='w-[40px]'
            >
              <TableCellLayout>
                <strong>[{item.no.label}]</strong> {item.name.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={item.price.icon}>
                {item.price.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={item.category.icon}
                className='capitalize'
              >
                {item.category.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TableMenu = (props: Props) => {
  const { searchTerm } = props;
  const { menuDataQ } = useMenu();

  const { isError, isLoading, isRefetching } = menuDataQ;

  if (isLoading || isRefetching) <p>Loading...</p>;

  if (isError) <p>some error occurred.</p>;

  return (
    <div className='max-h-[580px]  overflow-auto'>
      <MainTable filterBy={searchTerm} />
    </div>
  );
};

export default TableMenu;
