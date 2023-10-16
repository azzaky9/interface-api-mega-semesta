import useInputMenu from "../../hooks/useInputMenu";
import ButtonWithIcon from "../buttons/ButtonWithIcon";
import { Plus, Trash2 } from "lucide-react";
import LoadingButton from "../buttons/LoadingButton";
import { useMenu } from "../../context/MenuContext";

type PropControlMenu = {
  handleOpen: () => void;
};

export default function ControlMenu({ handleOpen }: PropControlMenu) {
  const { deleteMenu } = useInputMenu();
  const { menuData, menuDataQ } = useMenu();

  // const isSelectionEmpty = deletingMenus.length === 0;
  const isDataMenuSelected = menuData?.nodes.filter((node) => node.isComplete);

  console.log(isDataMenuSelected);

  return (
    <div className='px-4 py-4 border-2 flex gap-3 border-gray-200 rounded-md bg-white'>
      <ButtonWithIcon
        outline={false}
        size='md'
        color='primary'
        icon={<Plus size={17} />}
        text='Menu Baru'
        onClick={handleOpen}
      />
      {/* Developer purposes for insert many data */}
      {/* <LoadingButton
        onClick={() => {
          addManyMenuFromJson.mutate();
        }}
        defaulticon={<FileStack size={17} />}
        isloading={String(addManyMenuFromJson.isLoading)}
        text='Create Many'
      /> */}
      <LoadingButton
        disabled={isDataMenuSelected?.length === 0}
        color={isDataMenuSelected?.length === 0 ? "secondary" : "danger"}
        onClick={() => deleteMenu.mutateAsync().then(() => menuDataQ.refetch())}
        defaulticon={<Trash2 size={17} />}
        isloading={String(false)}
        text='Delete Selection Menu'
      />
    </div>
  );
}
