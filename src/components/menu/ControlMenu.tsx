import useInputMenu from "../../hooks/useInputMenu";
import { useMenu } from "../../context/MenuContext";

type PropControlMenu = {
  handleOpen: () => void;
};

export default function ControlMenu(props: PropControlMenu) {
  const {} = useInputMenu();
  const { menuData } = useMenu();

  const {} = props;

  // const isSelectionEmpty = deletingMenus.length === 0;
  const isDataMenuSelected = menuData?.nodes.filter((node) => node.isSelect);

  console.log(isDataMenuSelected);

  return (
    <div className='px-4 py-4 border-2 flex gap-3 border-gray-200 rounded-md bg-white'>
      {/* <ButtonWithIcon
        outline={false}
        size='md'
        color='primary'
        icon={<Plus size={17} />}
        text='Menu Baru'
        onClick={handleOpen}
      /> */}
      {/* Developer purposes for insert many data */}
      {/* <LoadingButton
        onClick={() => {
          addManyMenuFromJson.mutate();
        }}
        defaulticon={<></>}
        isloading={String(addManyMenuFromJson.isLoading)}
        text='Create Many'
      /> */}
      {/* {!menuDataQ.isLoading && (
        <LoadingButton
          disabled={isDataMenuSelected?.length === 0}
          color={isDataMenuSelected?.length === 0 ? "secondary" : "danger"}
          onClick={() =>
            deleteMenu.mutateAsync().then(() => menuDataQ.refetch())
          }
          defaulticon={<Trash2 size={17} />}
          isloading={String(false)}
          text='Delete Selection Menu'
        />
      )} */}
    </div>
  );
}
