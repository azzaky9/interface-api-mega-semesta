import * as React from "react";

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItemCheckbox,
  MenuPopover,
  Image,
  Field,
  Input
} from "@fluentui/react-components";
import {
  EditSettingsRegular,
  FoodRegular,
  DrinkToGoRegular,
  ShoppingBagRegular,
  SearchRegular
} from "@fluentui/react-icons";
import type { MenuProps } from "@fluentui/react-components";
import { useToggle } from "../../../hooks/useToggle";
import CigareIcons from "../../../assets/images/cigarette.png";
import { ChevronDown } from "lucide-react";
import { TSetStates } from "../../../types/types";

type Props = {
  value: Record<string, string[]>;
  setter: TSetStates<Record<string, string[]>>;
  savedCategory: Record<string, string[]>;
  savePrefference: () => void;
};

export const CheckboxCategory: React.FC<Props> = (props) => {
  const { setter, value, savePrefference, savedCategory } = props;

  const { handleClose, isOpen, handleOpen } = useToggle();

  const [searchMenu, setSearchMenu] = React.useState("");

  const onChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    setter((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  const onToggle = () => {
    if (isOpen) {
      setter(savedCategory);

      handleClose();
    } else {
      handleOpen();
    }
  };

  const saveAndClose = () => {
    savePrefference();

    if (value.category.length !== 0) {
      handleClose();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMenu(e.target.value);
  };

  return (
    <Menu
      checkedValues={value}
      onCheckedValueChange={onChange}
      open={isOpen}
    >
      <div className='flex gap-2'>
        <MenuTrigger disableButtonEnhancement>
          <Button
            onClick={onToggle}
            icon={<ChevronDown />}
            iconPosition='after'
          >
            Filter Menu
          </Button>
        </MenuTrigger>
        <Field>
          <Input
            contentBefore={<SearchRegular />}
            placeholder='Search...'
            value={searchMenu}
            onChange={handleSearchChange}
          />
        </Field>
      </div>
      <MenuPopover>
        <MenuList>
          <MenuItemCheckbox
            icon={<FoodRegular />}
            name='category'
            value='foods'
          >
            Foods
          </MenuItemCheckbox>
          <MenuItemCheckbox
            icon={<DrinkToGoRegular />}
            name='category'
            value='baverage'
          >
            Baverage
          </MenuItemCheckbox>
          <MenuItemCheckbox
            icon={<ShoppingBagRegular />}
            name='category'
            value='store'
          >
            Store
          </MenuItemCheckbox>
          <MenuItemCheckbox
            icon={
              <Image
                src={CigareIcons}
                alt='cigarattes-icons'
                height={14}
                width={14}
              />
            }
            name='category'
            value='rokok'
          >
            Rokok
          </MenuItemCheckbox>
          <Button
            appearance='outline'
            className='text-sm'
            icon={<EditSettingsRegular />}
            iconPosition='before'
            onClick={saveAndClose}
          >
            Save
          </Button>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
