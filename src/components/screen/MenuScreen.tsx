import TableMenu from "../tables/TableMenu";
import ControlMenu from "../menu/ControlMenu";
import useModal from "../../hooks/useModal";

export default function MenuScreen() {
  const modalUtils = useModal();

  const { handleOpen } = modalUtils;

  return (
    <div className='flex flex-col gap-4 mx-5 mt-3'>
      {/* <Modal className="mx-auto" title="Tambah menu baru" {...modalUtils}>
        <NewMenuForm handleClose={handleClose} />
      </Modal> */}
      <ControlMenu handleOpen={handleOpen} />
      <TableMenu />
    </div>
  );
}
