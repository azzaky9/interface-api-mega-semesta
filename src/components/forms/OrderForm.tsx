import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Card, Button } from "reactstrap";
import { Customer } from "../../types/types";
import DisplayError from "../utils/DisplayError";
import { useOrder } from "../../context/OrderContext";
import OnOffToggler from "./switches/SwitchTypeGuest";
import { useSwitch } from "../../hooks/useSwitch";
import { useFormsHelper } from "../../helpers/useFormHelper";

export type Switches = "on" | "off";

type OrderForm = Omit<Customer, "extraInformation">;

type onChange<T> = (e: ChangeEvent<HTMLInputElement>, setValueName: T) => void;

type Ref = Form;

const OrderForm = React.forwardRef<Ref, any>(function OrderForm(_, ref) {
  const { dispatch } = useOrder();
  const { isActive, handleChange, setIsActive } = useSwitch();
  const { getErr } = useFormsHelper()

  const t = useForm<OrderForm>();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    clearErrors
  } = t;

  const onSubmit: SubmitHandler<OrderForm> = (value) => {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: value
    });
  };

  const changeHandler: onChange<keyof OrderForm> = (e, setValueName) => {
    if (errors[setValueName]) clearErrors();

    setValue(setValueName, e.target.value);
  };
  
  const switchProps = { isActive, setIsActive, changeHandler: handleChange };

  return (
    <Card className='shadow-md w-[420px] px-4  pb-5'>
      <Form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='py-10 text-center text-lg font-semibold'>
          Input Customer
        </h3>
        <OnOffToggler
          {...switchProps}
          toggleModel='switch'
        />
        <div className='flex flex-col gap-2'>
          <FormGroup>
            <Label
              for='input-name'
              className='text-sm'
            >
              Nama Customer
            </Label>
            <Input
              invalid={errors.customerNames !== undefined}
              type='text'
              {...register("customerNames", {
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, "customerNames"),
                minLength: {
                  value: 3,
                  message: "must be greater than 3 character long"
                },
                required: {
                  value: true,
                  message: "customer names must be required"
                }
              })}
            />
            {getErr<OrderForm>(errors, "customerNames").isError && (
              <DisplayError message={getErr<OrderForm>(errors, "customerNames").message} />
            )}
          </FormGroup>

          {isActive === "on" && (
            <FormGroup>
              <Label
                for='room-number-input'
                className='text-sm'
              >
                No Kamar
              </Label>
              <Input
                id='room-number-input'
                autoComplete='off'
                {...register("roomNumber", {
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    changeHandler(e, "roomNumber")
                })}
                name='roomNumber'
                type='number'
                min={1}
                defaultValue={1}
              />
            </FormGroup>
          )}
        </div>
        <div className='d-grid'>
          <Button
            className='mt-4'
            color='primary'
          >
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
});

export default OrderForm;
