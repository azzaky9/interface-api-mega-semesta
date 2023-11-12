import { Spinner } from "@fluentui/react-components";

export default function Loader() {
  return (
    <div className='grid place-content-center h-full gap-3 '>
      <Spinner
        appearance='primary'
        label='Mengambil menu..'
      />
    </div>
  );
}
