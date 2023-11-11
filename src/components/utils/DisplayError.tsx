
interface PropsDisplayError {
  message: any;
}

export default function DisplayError({ message }: PropsDisplayError) {
  return <span className="text-red-500">{message}</span>;
}
