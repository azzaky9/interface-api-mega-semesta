import { Spinner } from "@fluentui/react-components";

type Props = {
  customLabel?: string
}

export default function Loader({ customLabel }: Props) {
  return (
    <div className='grid place-content-center h-full gap-3 '>
      <Spinner
        appearance='primary'
        label={customLabel ? customLabel : "Mengambil menu.."}
      />
    </div>
  );
}
