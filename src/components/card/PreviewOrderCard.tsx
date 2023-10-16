import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

export default function PreviewOrderCard() {
  return (
    <Card className='my-2 col-span-2 w-[80%] h-[62%]'>
      <CardHeader>Header</CardHeader>
      <CardBody>
        <CardTitle tag='h5'>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button>
      </CardBody>
    </Card>
  );
}
