import { Divider } from "@fluentui/react-components";
import useCurrency from "../../hooks/useCurrency";

export type Props = {
  label: string;
  values: number;
  variant?: "red" | "blue" | "yellow" | "green";
  icon: JSX.Element;
};

export default function SalesBanner(props: Props) {
  const { label, values, icon, variant } = props;
  const { formatToIdrCurrency } = useCurrency()

  const getVariantColors = () => {
    switch (variant) {
      case "red":
        return { upper: "bg-red-500", bottom: "bg-red-300" };
      case "green":
        return { upper: "bg-green-500", bottom: "bg-green-300" };
      default: 
        return { upper: "", bottom: "" }
    }
  };

  const colors = getVariantColors();

  return (
    <div className='bg-white border text-zinc-900  border-black'>
      <div
        className={`flex gap-2 px-4 py-2 items-center ${colors.upper}`}
      >
        {icon}
        <h1>{label}</h1>
      </div>
      <Divider />
      <div className={`px-8 py-4 max-h-[120px] text-xl font-bold ${colors.bottom}`}>{formatToIdrCurrency(values)}</div>
    </div>
  );
}
