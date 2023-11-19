import React, { useState } from "react";
import {
  Caption1,
  Card,
  CardHeader,
  Text,
  Button,
  Avatar,
  PresenceBadge,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem
} from "@fluentui/react-components";
import {
  ChevronDown24Regular,
  ChevronUp24Regular,
  MoreHorizontal20Regular
} from "@fluentui/react-icons";
import { SignOut24Regular } from "@fluentui/react-icons/lib/fonts";
import { useAuth } from "../../context/AuthContext";

// implement later

// type Props = {
//   adminName: string;
//   lastSeen: string;
// };

export default function Profiles() {
  const { signoutAdmin } = useAuth()

  const [isProfilesOpen, setProfilesOpen] = useState(false);

  return (
    <div
      className={`z-30 mx-4 absolute -top-[3.5rem] right-0 flex flex-col transition-all duration-300 ${
        isProfilesOpen ? "translate-y-16" : "translate-y-0"
      }`}
    >
      <Card
        appearance='filled'
        size='small'
        className=' z-30 w-[280px] h-fit'
      >
        <CardHeader
          image={
            <Avatar
              className='me-3'
              name='Nita Ritriany'
              badge={{
                icon: (
                  <PresenceBadge
                    status='available'
                    size='small'
                  />
                )
              }}
            />
          }
          header={<Text weight='semibold'>Anita Ritriany</Text>}
          description={
            <Caption1 className='text-gray-400 text-sm'>
              Last seen at 2023 08 09
            </Caption1>
          }
          action={
            <RenderMenu
              items={[
                {
                  label: "Log Out",
                  onClick: () => signoutAdmin(),
                  icon: <SignOut24Regular />
                }
              ]}
              triggerButton={
                <Button
                  appearance='transparent'
                  icon={<MoreHorizontal20Regular />}
                />
              }
            />
          }
        />
      </Card>

      <Button
        onClick={() => setProfilesOpen(!isProfilesOpen)}
        size='small'
        className='z-30 self-end rounded-br-2xl rounded-bl-2xl'
        icon={
          !isProfilesOpen ? <ChevronDown24Regular /> : <ChevronUp24Regular />
        }
      />
    </div>
  );
}

type Items = {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
};

type RenderMenuProps = {
  items: Items[];
  triggerButton: JSX.Element;
};

const RenderMenu: React.FC<RenderMenuProps> = ({ items, triggerButton }) => {
  return (
    <Menu>
      <MenuTrigger>{triggerButton}</MenuTrigger>

      <MenuPopover>
        <MenuList>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.onClick}
              icon={item.icon}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
