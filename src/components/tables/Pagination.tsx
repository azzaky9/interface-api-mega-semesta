import { Button } from "@fluentui/react-components";
import {
  ChevronLeft16Regular,
  ChevronRight16Regular
} from "@fluentui/react-icons";
import { useState } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  itemsPerPage: number;
};

// type ItemProps = {
//   currentItems: number;
// };

type NextPrevProps = {
  direction: "prev" | "next";
};

function NextPrevButton({ direction }: NextPrevProps) {
  return <Button size="small" icon={direction === "prev" ? <ChevronLeft16Regular  /> : <ChevronRight16Regular />} />;
}



function Pagination({ itemsPerPage }: Props) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  // Invoke when user click to request another page.

  return (
    <>
      <ReactPaginate
        breakLabel='...'
        className="flex list-none "
        nextLabel={<NextPrevButton direction="next" />}
        onPageChange={() => setItemOffset(itemOffset + 1)}
        pageRangeDisplayed={5}
        pageCount={10}
        pageLabelBuilder={(page) => <Button icon={page} size="small" appearance="transparent" className="rounded-none" />}
        previousLabel={<NextPrevButton direction="prev" />}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
