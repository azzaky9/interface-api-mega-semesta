import useInputMenu from "../../hooks/useInputMenu";
import { MenuState, useMenu } from "../../context/MenuContext";
import { Badge, Input } from "@fluentui/react-components";
import * as React from "react";
import {
  DeleteDismissRegular,
  AddSquareRegular,
  SearchRegular,
  Settings24Regular,
  ArrowSync24Regular
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { UseMutationResult } from "react-query";

type PropControlMenu = {
  handleOpen: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

export default function ControlMenu(props: PropControlMenu) {
  const { deleteMenu } = useInputMenu();
  const { menuData } = useMenu();

  const { handleOpen, handleSearch, searchValue } = props;

  // const isSelectionEmpty = deletingMenus.length === 0;
  // const isDataMenuSelected = menuData
  //   ? menuData.nodes.filter((node) => node.isSelect)
  //   : [];

  const defaultControlProps = {
    searchValue,
    handleSearch,
    handleOpen,
    menuData,
    deleteMenu
  };

  return (
    <div className='px-4 py-4 border-2 flex gap-3 border-gray-200 rounded-md bg-white'>
      <DefaultControl {...defaultControlProps} />
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

type DeleteMenuFunction = {
  deleteMenu: UseMutationResult<void, unknown, void, unknown>;
  menuData: MenuState | null;
};

type Props = Partial<ToolbarProps & PropControlMenu & DeleteMenuFunction>;

export const DefaultControl = (props: Props) => {
  const { menuData, deleteMenu } = props;
  const { resetAllSelection } = useInputMenu();

  const getTotalSelection = menuData
    ? menuData.nodes.filter((item) => item.isSelect).length
    : 0;

  const createDeleteIndicator =
    getTotalSelection === 0 ? (
      <span>Delete</span>
    ) : getTotalSelection ? (
      <div className='flex justify-between'>
        <span>Delete</span>
        <Badge
          size='small'
          appearance='filled'
          color='danger'
        >
          <span className='text-xs'>
            {getTotalSelection > 10 ? `10+` : getTotalSelection}
          </span>
        </Badge>
      </div>
    ) : null;

  return (
    <Toolbar
      aria-label='Default'
      {...props}
    >
      <Input
        value={props.searchValue}
        onChange={props.handleSearch}
        contentBefore={<SearchRegular />}
      />
      <ToolbarDivider />
      <Menu>
        <MenuTrigger>
          <ToolbarButton
            aria-label='More'
            icon={<Settings24Regular />}
          />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem
              icon={<AddSquareRegular />}
              onClick={props.handleOpen}
            >
              New Menu
            </MenuItem>
            <MenuItem
              icon={<DeleteDismissRegular />}
              disabled={getTotalSelection === 0}
              onClick={() => deleteMenu?.mutateAsync()}
            >
              {createDeleteIndicator}
            </MenuItem>
            <MenuItem
              icon={<ArrowSync24Regular />}
              onClick={resetAllSelection}
            >
              Reset Selection
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <ToolbarDivider />
    </Toolbar>
  );
};
