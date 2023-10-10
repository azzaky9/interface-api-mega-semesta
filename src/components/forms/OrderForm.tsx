import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Card, Button } from "reactstrap";
import { Customer } from "../../types/types";
import DisplayError from "../utils/DisplayError";
import SwitchTypeGuest from "./switches/SwitchTypeGuest";
import { useOrder } from "../../context/OrderContext";

export type Switches = "on" | "off";

type OrderForm = Omit<Customer, "extraInformation">;

type onChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValueName: keyof OrderForm
) => void;

type Ref = Form;

const OrderForm = React.forwardRef<Ref, any>(function OrderForm(_, ref) {
  const [isHotelGuest, setIsHotelGuest] = useState<Switches>("off");

  const { dispatch, state } = useOrder();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    clearErrors
  } = useForm<OrderForm>();

  const onSubmit: SubmitHandler<OrderForm> = (value) => {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: value
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const changeHandler: onChange = (e, setValueName) => {
    if (errors[setValueName]) clearErrors();

    setValue(setValueName, e.target.value);
  };

  const getError = (valueToCheck: keyof OrderForm) => {
    const isError = errors[valueToCheck] !== undefined;
    const message = isError ? errors[valueToCheck]?.message : "";

    return { isError, message: message };
  };

  const switchProps = { isHotelGuest, setIsHotelGuest };

  return (
    <Card className='shadow-md w-[420px] px-4  pb-5'>
      <Form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='py-10 text-center text-lg font-semibold'>
          Input Customer
        </h3>
        <SwitchTypeGuest {...switchProps} />
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
            {getError("customerNames").isError && (
              <DisplayError message={getError("customerNames").message || ""} />
            )}
          </FormGroup>

          {isHotelGuest === "on" && (
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
