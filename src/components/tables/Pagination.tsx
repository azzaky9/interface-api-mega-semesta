import { Pagination } from "@table-library/react-table-library/types/pagination";
import { Button } from "@fluentui/react-components";
import { MenuEditableSchema } from "../../context/MenuContext";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";

type Props = {
  pagination: Pagination<MenuEditableSchema>;
  dataNodes: MenuEditableSchema[];
};

export default function Pagination({ pagination, dataNodes }: Props) {
  const currentPages = pagination.state.page;
  const totalPages = pagination.state.getTotalPages(dataNodes);
  const isLastPages = currentPages === totalPages - 1;
  const isFirstPages = pagination.state.page === 0;

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
        <div className='flex justify-center items-center h-[42px]'>
          <Button
            size='medium'
            onClick={() => handlePrevNextPages("prev")}
            iconPosition='before'
            icon={<ChevronLeftRegular />}
          />
          {/* <PaginationLink previous /> */}
          <span className='px-2'>
            {currentPages + 1} / {totalPages}
          </span>

          <Button
            size='medium'
            onClick={() => handlePrevNextPages("next")}
            iconPosition='after'
            icon={<ChevronRightRegular />}
          />
        </div>
      </div>
      <span>Total Pages: {totalPages}</span>
    </div>
  );
}
