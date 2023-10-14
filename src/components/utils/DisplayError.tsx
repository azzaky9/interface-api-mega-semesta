import { FormFeedback } from "reactstrap";

interface PropsDisplayError {
  message: any;
}

export default function DisplayError({ message }: PropsDisplayError) {
  return <FormFeedback>{message}</FormFeedback>;
}
