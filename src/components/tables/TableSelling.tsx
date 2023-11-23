import * as React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import {
  Avatar,
  useScrollbarWidth,
  useFluent,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  TableSelectionCell,
  createTableColumn,
  useTableFeatures,
  useTableSelection,
  TableRowData as RowStateBase,
  Button,
  Tooltip
} from "@fluentui/react-components";
import { type OrderResponse } from "../screen/MainDashboard";
import {
  CheckmarkRegular,
  ClipboardTaskList16Regular,
  HomePersonRegular,
  MoneyRegular,
  PersonArrowRightRegular,
  PersonLockRegular
} from "@fluentui/react-icons";
import useCurrency from "../../hooks/useCurrency";
import ApprovePayment from "../service/ApprovePayment";

type Item = {
  docId: {
    value: string;
  };
  name: {
    label: string;
    customerType: OrderResponse["customerType"];
  };
  pembelian: {
    label: string;
    buttonAction: () => void;
  };
  admin: {
    label: string;
  };
  createdAt: {
    label: string;
  };
  payedAt: {
    label: string;
    status: "success" | "pending";
  };
  amount: {
    label: string;
    icon: JSX.Element;
  };
  docData: {
    value: OrderResponse;
  };
};

interface TableRowData extends RowStateBase<Item> {
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  selected: boolean;
  appearance: "brand" | "none";
}

interface ReactWindowRenderFnProps extends ListChildComponentProps {
  data: TableRowData[];
}

const columnIdList = [
  "name",
  "pembelian",
  "admin",
  "createdAt",
  "payedAt",
  "amount"
];

const columns = columnIdList.map((colId) =>
  createTableColumn<Item>({ columnId: colId })
);

const RenderRow = ({ index, style, data }: ReactWindowRenderFnProps) => {
  const { item, selected, appearance, onClick, onKeyDown } = data[index];

  const hashIconList = {
    incharge: {
      label: "Pembelian Incharge customer",
      icon: <PersonArrowRightRegular />
    },
    gelora: {
      label: "Pembelian pada gelora",
      icon: <PersonLockRegular />
    },
    hotel: {
      label: "Pembelian hotel",
      icon: <HomePersonRegular />
    }
  };

  return (
    <TableRow
      aria-rowindex={index + 2}
      style={style}
      key={item.name.label}
      onKeyDown={onKeyDown}
      appearance={appearance}
    >
      <TableCell>
        <TableSelectionCell
          onClick={onClick}
          checked={selected}
          checkboxIndicator={{ "aria-label": "Select row" }}
        />
        <TableCellLayout
          media={
            <Tooltip
              relationship='label'
              content={hashIconList[item.name.customerType].label}
            >
              {hashIconList[item.name.customerType].icon}
            </Tooltip>
          }
        >
          <span className='text-md capitalize  '>
            {item.name.label.trim().length > 17
              ? `${item.name.label.substring(0, 15)}...`
              : item.name.label}
          </span>
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            <Button
              className='relative z-50 rounded-lg'
              icon={<ClipboardTaskList16Regular />}
              appearance='primary'
            >
              Cek Pembelian
            </Button>
          }
        ></TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.admin.label}
              name='Anita'
            />
          }
        >
          {/* {item.admin.label} */}
          Anita
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout aria-label='created-indicator'>
          Created At, 20 Nov 2023
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout
          aria-label='payment-indicator'
          media={
            item.payedAt.status === "success" ? (
              <Tooltip
                content='Pembelian di verifikasi'
                relationship='label'
              >
                <Button
                  appearance='subtle'
                  size='small'
                  icon={<CheckmarkRegular color='green' />}
                />
              </Tooltip>
            ) : null
          }
        >
          {item.payedAt.status === "pending" ? (
            <ApprovePayment docData={item.docData.value} />
          ) : (
            item.payedAt.label
          )}
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <span>{item.amount.label}</span>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  dataOrder: OrderResponse[];
};

export const TableSelling: React.FC<Props> = ({ dataOrder }) => {
  const { targetDocument } = useFluent();
  const { formatToIdrCurrency } = useCurrency();

  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  const matchTables = React.useCallback(() => {
    const result: Item[] = dataOrder.map((data, _) => {
      return {
        docId: {
          value: data.docId
        },
        name: {
          label: data.name,
          customerType: data.customerType
        },
        admin: {
          label: data.admin.adminName
        },
        amount: {
          label: formatToIdrCurrency(data.payment.amount),
          icon: <MoneyRegular />
        },
        createdAt: {
          label: data.createdAt
        },
        payedAt: {
          label: data.payment.payedAt,
          status: data.payment.isSuccess ? "success" : "pending"
        },
        pembelian: {
          label: "any",
          buttonAction: () => console.log("clicked")
        },
        docData: {
          value: data
        }
      };
    });

    return result;
  }, [dataOrder]);

  const items = matchTables();

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
        defaultSelectedItems: new Set([])
      })
    ]
  );

  const rows: TableRowData[] = getRows((row) => {
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

  return (
    <Table
      noNativeElements
      aria-label='Table with selection'
      aria-rowcount={rows.length}
    >
      <TableHeader>
        <TableRow aria-rowindex={1}>
          <TableSelectionCell
            checked={
              allRowsSelected ? true : someRowsSelected ? "mixed" : false
            }
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ "aria-label": "Select all rows" }}
          />

          <TableHeaderCell>Nama</TableHeaderCell>
          <TableHeaderCell>Pembelian</TableHeaderCell>
          <TableHeaderCell>Admin</TableHeaderCell>
          <TableHeaderCell>Created At</TableHeaderCell>
          <TableHeaderCell>Payed At</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          {/** Scrollbar alignment for the header */}
          <div
            role='presentation'
            style={{ width: scrollbarWidth }}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        <List
          height={500}
          itemCount={items.length}
          itemSize={50}
          width='98%'
          itemData={rows}
        >
          {RenderRow}
        </List>
      </TableBody>
    </Table>
  );
};

export type { Item };
