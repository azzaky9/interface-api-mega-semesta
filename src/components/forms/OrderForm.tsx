import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";

export default function OrderForm() {
  return (
    <Card className='w-[420px] px-4 pt-5 pb-3'>
      <Form>
        <FormGroup
          className='mb-4'
          switch
        >
          <Input
            className='hover:cursor-pointer'
            type='switch'
            role='switch'
          />
          <Label
            className='text-sm'
            check
          >
            Tamu Hotel ?
          </Label>
        </FormGroup>
        <div className='flex flex-col gap-2'>
          <FormGroup>
            <Input type='text' />
            <Label className='text-sm'>Nama Customer</Label>
          </FormGroup>
          <FormGroup>
            <Input type='text' />
            <Label className='text-sm'>Keterangan</Label>
          </FormGroup>
          <FormGroup>
            <Input
              id='roomNumber'
              name='roomNumber'
              type='number'
              min={0}
            />
            <Label
              for='roomNumber'
              className='text-sm'
            >
              No Kamar
            </Label>
          </FormGroup>{" "}
        </div>
      </Form>
    </Card>
  );
}
