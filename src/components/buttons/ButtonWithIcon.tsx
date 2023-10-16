import { Button, ButtonProps } from "reactstrap";

type PropButtonWithIcon = {
  text: string;
  icon: JSX.Element;
};

export default function ButtonWithIcon(prop: Partial<PropButtonWithIcon> & ButtonProps) {
  const { icon, text } = prop;

  return (
    <Button {...prop}>
      <div className='flex gap-2 justify-center items-center pr-2 '>
        {icon}
        <span className='mb-0.5'> {text}</span>
      </div>
    </Button>
  );
}
