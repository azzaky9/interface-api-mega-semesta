import TableMenu from "../tables/TableMenu";
import ControlMenu from "../menu/ControlMenu";
import useModal from "../../hooks/useModal";
import AddNewMenu from "../modal/AddNewMenu";
import { MenuProvider } from "../../context/MenuContext";

export default function MenuScreen() {
  const modalUtils = useModal();

  const { handleOpen } = modalUtils;

  return (
    <div className='flex flex-col gap-2 mx-3 mt-9'>
      <MenuProvider>
        <AddNewMenu {...modalUtils} />
        <ControlMenu handleOpen={handleOpen} />
        <TableMenu />
      </MenuProvider>
    </div>
  );
}
