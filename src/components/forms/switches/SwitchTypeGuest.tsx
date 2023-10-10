import { ChangeEvent } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { type Switches } from "../OrderForm";
import { TSetStates } from "../../../types/types";

type Props = {
  isHotelGuest: Switches;
  setIsHotelGuest: TSetStates<Switches>;
};

const SwitchTypeGuest: React.FC<Props> = (props) => {
  const { isHotelGuest, setIsHotelGuest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value as Switches;
    const setValue = eValue === "on" ? "off" : "on";

    setIsHotelGuest(setValue as Switches);
  };

  return (
    <FormGroup
      className='mb-4'
      switch
    >
      <Input
        value={isHotelGuest}
        className='hover:cursor-pointer'
        type='switch'
        role='switch'
        id="switch-guest"
        name="switch-guest"
        onChange={handleChange}
      />
      <Label
        for="switch-guest"
        className='text-sm'
        check
      >
        Tamu Hotel ?
      </Label>
    </FormGroup>
  );
};

export default SwitchTypeGuest;
