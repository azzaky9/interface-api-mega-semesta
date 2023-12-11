import TableStock from "../tables/TableStock";
import ControlDisplay from "../card/stock/ControlDisplay";

export default function StockScreen() {
  return (
    <main className='mx-5 mb-10 mt-5'>
      <ControlDisplay />
      <TableStock />
    </main>
  );
}
