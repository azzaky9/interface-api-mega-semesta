import { FormFeedback } from "reactstrap";

interface PropsDisplayError {
  message: string;
}

export default function DisplayError({ message }: PropsDisplayError) {
  return <FormFeedback>{message}</FormFeedback>;
}
