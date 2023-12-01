import { TableHeaderCell } from "@fluentui/react-components";

type Props = {
  titles: string[];
};

export default function RenderHeaderCells(props: Props) {
  const { titles } = props;

  return (
    <>
      {titles.map((title, index) => (
        <TableHeaderCell key={index}>{title}</TableHeaderCell>
      ))}
    </>
  );
}
