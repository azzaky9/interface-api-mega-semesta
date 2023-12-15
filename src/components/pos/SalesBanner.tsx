import { Divider } from "@fluentui/react-components";

type Props = {
  label: string;
  values: string;
  variant: "red" | "blue" | "yellow" | "green";
  icon: JSX.Element;
};

export default function SalesBanner(props: Props) {
  const { label, values,  icon } = props;

  return (
    <div className='bg-white shadow-md'>
      <div className='flex gap-2 px-4 py-2 justify-center items-center'>
        <h1>{label}</h1>
        {icon}
      </div>
      <Divider />
      <div className='px-8 py-10'>{values}</div>
    </div>
  );
}
