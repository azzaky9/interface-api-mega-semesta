import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Customer } from "../../types/types";
import DisplayError from "../utils/DisplayError";
import { useOrder } from "../../context/OrderContext";
import OnOffToggler from "./switches/SwitchTypeGuest";
import { useSwitch } from "../../hooks/useSwitch";
import { useFormsHelper } from "../../helpers/useFormHelper";

export type Switches = "on" | "off";

type OrderForm = Omit<Customer, "extraInformation">;

type onChange<T> = (e: ChangeEvent<HTMLInputElement>, setValueName: T) => void;

type Ref = any;

type Props = {
  changePosition: () => void;
};

const OrderForm = React.forwardRef<Ref, Props>(function OrderForm(props, ref) {
  const { dispatch, state } = useOrder();
  const { isActive, handleChange, setIsActive } = useSwitch();
  const { getErr } = useFormsHelper();
  const { changePosition } = props;

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

    changePosition();
  };

  console.log(state);

  const changeHandler: onChange<keyof OrderForm> = (e, setValueName) => {
    if (errors[setValueName]) clearErrors();

    setValue(setValueName, e.target.value);
  };

  const switchProps = { isActive, setIsActive, changeHandler: handleChange };

  return (
    <div className='shadow-md w-[420px] px-4 pb-5'>
      <form
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
          <div>
            <label
              className='text-sm'
            >
              Nama Customer
            </label>
            <input
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
              <DisplayError
                message={getErr<OrderForm>(errors, "customerNames").message}
              />
            )}
          </div>

          {isActive === "on" && (
            <div>
              <label
                className='text-sm'
              >
                No Kamar
              </label>
              <input
                id='room-number-input'
                autoComplete='off'
                {...register("roomNumber", {
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    changeHandler(e, "roomNumber")
                })}
                name='roomNumber'
                type='number'
                min={1}
                defaultValue={state.customer.roomNumber}
              />
            </div>
          )}
        </div>
        <div className='d-grid'>
          <button
            className='mt-4'
            color='primary'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});

export default OrderForm;
