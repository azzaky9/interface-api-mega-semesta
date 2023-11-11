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
  Input,
  useToastController
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

export const CheckboxCategory = () => {
  const defaultCategory = ["foods", "rokok", "baverage", "store"];

  const { handleClose, isOpen, handleOpen } = useToggle();
  const {} = useToastController();

  const [searchMenu, setSearchMenu] = React.useState("");
  const [checkedValues, setCheckedValues] = React.useState<
    Record<string, string[]>
  >({ category: defaultCategory });
  const onChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  const savePrefference = () => {
    handleClose();

    console.log("ts");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMenu(e.target.value);
  };

  return (
    <Menu
      checkedValues={checkedValues}
      onCheckedValueChange={onChange}
      open={isOpen}
    >
      <div className='flex gap-2'>
        <MenuTrigger disableButtonEnhancement>
          <Button
            onClick={handleOpen}
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
            onClick={savePrefference}
          >
            Save
          </Button>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
