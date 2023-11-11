type PropButtonWithIcon = {
  text: string;
  icon: JSX.Element;
  direction: "left" | "right";
};

export default function ButtonWithIcon(prop: Partial<PropButtonWithIcon>) {
  const { icon, text } = prop;

  return (
    <button {...prop}>
      <div className='flex gap-2 justify-center items-center pr-2 '>
        {icon}
        <span className='mb-0.5'> {text}</span>
      </div>
    </button>
  );
}
