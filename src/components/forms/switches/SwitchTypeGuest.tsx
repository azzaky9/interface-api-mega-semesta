import { ChangeEvent } from "react";
import { type Switches } from "../OrderForm";
import { TSetStates } from "../../../types/types";

type Props = {
  isActive: Switches;
  setIsActive: TSetStates<Switches>;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleModel: "checkbox" | "switch";
};

const OnOffToggler: React.FC<Props> = (props) => {
  const { isActive, toggleModel, changeHandler } = props;

  return (
    <div className='flex gap-3 items-center justify-center mb-5 p-0'>
      <input
        value={isActive}
        className='hover:cursor-pointer'
        type={toggleModel}
        role={toggleModel}
        id='switch-guest'
        name='switch-guest'
        onChange={changeHandler}
      />
      <label className='text-sm'>Tamu Hotel ?</label>
    </div>
  );
};

export default OnOffToggler;
