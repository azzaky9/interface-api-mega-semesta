import ButtonWithIcon from "../buttons/ButtonWithIcon";
import { Plus } from "lucide-react";

type PropControlMenu = {
  handleOpen: () => void;
};

export default function ControlMenu({ handleOpen }: PropControlMenu) {
  return (
    <div className='px-4 py-4 border-2 border-gray-200 rounded-md bg-white'>
      <ButtonWithIcon
        outline={false}
        size="md"
        color='primary'
        icon={<Plus size={17} />}
        text='Menu Baru'
        onClick={handleOpen}
      />
    </div>
  );
}
