import { Pagination } from "@table-library/react-table-library/types/pagination";

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
      <div aria-label='pagination-table-menus'>
        <div onClick={() => handlePrevNextPages("prev")}>
          {/* <PaginationLink previous /> */}
          prev
        </div>
        {bindTypesDataTable.map((_, index) => (
          <div
            key={index}
            onClick={() => pagination.fns.onSetPage(index)}
          >
            <a href='#'>{index + 1}</a>
          </div>
        ))}

        <div onClick={() => handlePrevNextPages("next")}>
          <div />
          Next
        </div>
      </div>
      <span>Total Pages: {totalPages}</span>
    </div>
  );
}
