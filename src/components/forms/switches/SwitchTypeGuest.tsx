import { ChangeEvent } from "react";
import { FormGroup, Input, Label } from "reactstrap";
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
    <FormGroup
      switch
      className='flex gap-3 items-center justify-center mb-5 p-0'
    >
      <Input
        value={isActive}
        className='hover:cursor-pointer'
        type={toggleModel}
        role={toggleModel}
        id='switch-guest'
        name='switch-guest'
        onChange={changeHandler}
      />
      <Label
        for='switch-guest'
        className='text-sm'
        check
      >
        Tamu Hotel ?
      </Label>
    </FormGroup>
  );
};

export default OnOffToggler;
