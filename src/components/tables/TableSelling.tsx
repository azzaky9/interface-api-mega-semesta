import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup
} from "@fluentui/react-components";

const items = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />
    }
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />
    }
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />
    }
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />
    }
  }
];

const columns = [
  { columnKey: "file", label: "File", size: "w-[120pxpo6t]" },
  { columnKey: "author", label: "Author", size: "max-w-[230px] w-full" },
  {
    columnKey: "lastUpdated",
    label: "Last updated",
    size: "max-w-[230px] w-full"
  },
  { columnKey: "actions", label: "Actions", size: "max-w-[230px] w-full" },
  { columnKey: "actions", label: "Actions", size: "max-w-[230px] w-full" },
  { columnKey: "actions", label: "Actions", size: "max-w-[230px] w-full" }
];

export const TableSelling = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus"
  });

  return (
    <Table
      {...keyboardNavAttr}
      aria-label='Table with grid keyboard navigation'
    >
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell
              className={column.size}
              key={column.columnKey}
            >
              {column.label}
            </TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.file.label}>
            <TableCell tabIndex={0}>
              <TableCellLayout media={item.file.icon}>
                {item.file.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0}>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0}>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>

            <TableCell tabIndex={0}>{item.lastUpdated.label}</TableCell>
            <TableCell tabIndex={0}>{item.lastUpdated.label}</TableCell>

            <TableCell
              width={520}
              tabIndex={0}
              {...focusableGroupAttr}
            >
              <TableCellLayout>
                <Button
                  icon={<EditRegular />}
                  aria-label='Edit'
                />
                <Button
                  icon={<DeleteRegular />}
                  aria-label='Delete'
                />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
