import { Select, SelectProps, useId } from "@fluentui/react-components";

type Props = {
  label?: string;
  options: string[];
};

export default function ControlledSelect(props: Props & SelectProps) {
  const selectId = useId();

  const { options, label } = props;

  return (
    <div className='flex flex-col gap-2'>
      {label ? <label htmlFor={selectId}>{label}</label> : null}
      <Select {...props}>
        {options.map((option, index) => (
          <option
            value={option}
            key={index}
          >
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
