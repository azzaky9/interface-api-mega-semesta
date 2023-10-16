import { FormGroup, Input, Label } from "reactstrap";
import { CategoryIncAll } from "../../menu/MenuList";
import { TSetStates } from "../../../types/types";
import { ChangeEvent } from "react";

type Props = {
  selectedCategory: CategoryIncAll;
  setSelectedCategory: TSetStates<CategoryIncAll>;
};

export default function CheckboxCategory(props: Props) {
  const { selectedCategory, setSelectedCategory } = props;

  const radioFilterItems: CategoryIncAll[] = [
    "all",
    "baverage",
    "foods",
    "rokok",
    "store"
  ];

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value as CategoryIncAll);
  };

  return (
    <div className='flex gap-4 p-3'>
      {radioFilterItems.map((item, _) => (
        <FormGroup
          key={item}
          className='flex gap-2 justify-center items-center'
        >
          <Input
            value={item}
            type='radio'
            onChange={handleRadioChange}
            checked={selectedCategory === item}
          />
          <Label>{item}</Label>
        </FormGroup>
      ))}
    </div>
  );
}
