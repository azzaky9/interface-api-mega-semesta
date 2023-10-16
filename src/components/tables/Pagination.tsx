import { Pagination } from "@table-library/react-table-library/types/pagination";
import {
  Pagination as PGContainer,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { MenuEditableSchema } from "../../context/MenuContext";

type Props = {
  pagination: Pagination<MenuEditableSchema>;
  dataNodes: MenuEditableSchema[];
};

export default function Pagination({ pagination, dataNodes }: Props) {
  const currentPages = pagination.state.page;
  const totalPages = pagination.state.getTotalPages(dataNodes);
  const isLastPages = currentPages === totalPages - 1;
  const isFirstPages = pagination.state.page === 0;

  const bindTypesDataTable = pagination.state.getPages(
    dataNodes
  ) as MenuEditableSchema[][];
  console.log(pagination.state.getPages(dataNodes));

  const handlePrevNextPages = (action: "next" | "prev") => {
    if (action === "next" && !isLastPages) {
      return pagination.fns.onSetPage(currentPages + 1);
    }

    if (action === "prev" && !isFirstPages) {
      return pagination.fns.onSetPage(currentPages - 1);
    }
  };

  return (
    <div className='flex justify-between'>
      <PGContainer
        size='md'
        aria-label='pagination-table-menus'
      >
        <PaginationItem onClick={() => handlePrevNextPages("prev")}>
          <PaginationLink previous />
        </PaginationItem>
        {bindTypesDataTable.map((_, index) => (
          <PaginationItem
            key={index}
            onClick={() => pagination.fns.onSetPage(index)}
            active={currentPages === index}
          >
            <PaginationLink href='#'>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem onClick={() => handlePrevNextPages("next")}>
          <PaginationLink next />
        </PaginationItem>
      </PGContainer>
      <span>Total Pages: {totalPages}</span>
    </div>
  );
}
