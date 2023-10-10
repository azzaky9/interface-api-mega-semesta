import { Button } from "reactstrap";
import TableMenu from "../tables/TableMenu";
import ButtonWithIcon from "../buttons/ButtonWithIcon";
import { Plus } from "lucide-react";


export default function MenuScreen() {
  return (
    <div className='flex flex-col gap-2 mx-3 mt-9'>
      <div className="mb-3" >
        <ButtonWithIcon color="primary" icon={<Plus size={17} />} text="Menu Baru" />
      </div>
      <TableMenu />
    </div>
  );
}

