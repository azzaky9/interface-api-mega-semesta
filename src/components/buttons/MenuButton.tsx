import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover
} from "@fluentui/react-components";
import { ChevronDownRegular } from "@fluentui/react-icons";

export type MenuAction = {
  name: string;
  action: () => void;
  icons: JSX.Element;
};

type Props = {
  listMenu: MenuAction[];
};

export default function MenuButton(props: Props) {
  const { listMenu } = props;

  const createMenuItem = listMenu.map((menu, index) => (
    <MenuItem
      className='text-sm'
      icon={menu.icons}
      onClick={menu.action}
      key={index}
    >
      {menu.name}
    </MenuItem>
  ));

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          icon={<ChevronDownRegular />}
          appearance='outline'
          iconPosition='after'
          className='text-sm'
        >
          Action
        </Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{createMenuItem}</MenuList>
      </MenuPopover>
    </Menu>
  );
}
