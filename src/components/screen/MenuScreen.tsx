import TableMenu from "../tables/TableMenu";
import ControlMenu from "../menu/ControlMenu";
import useModal from "../../hooks/useModal";
import AddNewMenu from "../modal/AddNewMenu";

export default function MenuScreen() {
  const modalUtils = useModal();

  const { handleOpen } = modalUtils;

  return (
    <div className='flex flex-col gap-4 mx-5 mt-3'>
      <AddNewMenu {...modalUtils} />
      <ControlMenu handleOpen={handleOpen} />
      <TableMenu />
    </div>
  );
}
