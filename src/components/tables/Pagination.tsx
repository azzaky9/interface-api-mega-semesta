import { Button } from "@fluentui/react-components";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";


export default function Pagination() {
 

  return (
    <div className='flex justify-between'>
      <div aria-label='pagination-table-menus'>
        <div className='flex justify-center items-center h-[42px]'>
          <Button
            size='medium'
            iconPosition='before'
            icon={<ChevronLeftRegular />}
          />
          {/* <PaginationLink previous /> */}
          <span className='px-2'>
          </span>

          <Button
            size='medium'
            iconPosition='after'
            icon={<ChevronRightRegular />}
          />
        </div>
      </div>
      <span>Total Pages: Develop</span>
    </div>
  );
}
