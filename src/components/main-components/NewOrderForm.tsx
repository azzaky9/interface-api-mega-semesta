import React from "react";
import {
  Button,
  Field,
  InfoLabel,
  Input,
  InputProps,
  Label,
  InfoLabelProps,
  useId,
  Select
} from "@fluentui/react-components";
import { MenuList, MenuItemRadio } from "@fluentui/react-components";
import {
  HomePersonRegular,
  PersonArrowRightRegular,
  PersonLockRegular
} from "@fluentui/react-icons";
import type { FieldProps, MenuProps } from "@fluentui/react-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";

type NewOrderSchema = {
  fullName: string;
  noBedroom?: number;
  paymentMethod: "cash" | "unpaid";
};

type TNewOrderProps = {
  handleClose: () => void;
};

export default function NewOrderForm({ handleClose }: TNewOrderProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    setValue
  } = useForm<NewOrderSchema>();

  const navigate = useNavigate();
  const selectId = useId();
  const { dispatch } = useOrder();

  const [checkedValues, setCheckedValues] = React.useState<
    Record<string, string[]>
  >({ customerType: ["incharge"] });

  const customerType = checkedValues.customerType[0];

  const onChange: MenuProps["onCheckedValueChange"] = (
    _e,
    { name, checkedItems }
  ) => {
    setValue("noBedroom", 0);
    clearErrors("noBedroom");

    setCheckedValues((s) => ({ ...s, [name]: checkedItems }));
  };

  const createOptionalRequired =
    customerType === "hotel" ? <span className='text-red-600'>*</span> : null;

  const onSubmit: SubmitHandler<NewOrderSchema> = (data) => {
    console.table(data)

    if (customerType === "hotel" && !data.noBedroom) {
      return setError("noBedroom", {
        type: "required",
        message: "no bedroom must be required"
      });
    }

    const clearName = data.fullName.trim();

    const result = { ...data, fullName: clearName, customerType };

    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: {
        customerNames: result.fullName.toLowerCase(),
        extraInformation: "",
        roomNumber: result.noBedroom,
        paymentMethod: result.paymentMethod
      }
    });

    navigate(
      `/register?name=${result.fullName}&type=${result.customerType}${
        result.noBedroom ? `&rn=${result.noBedroom}` : ""
      }&payMethod=${result.paymentMethod}`
    );

    return result;
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        fieldProps={{
          label: "Name",
          required: true,
          validationMessage: errors.fullName
            ? errors.fullName.message
            : undefined,
          validationState: errors.fullName ? "error" : "none"
        }}
        inputProps={{
          ...register("fullName", {
            min: {
              value: 3,
              message: "panjang nama harus lebih dari 3"
            }
          }),
          autoComplete: "false",
          type: "text"
        }}
        labelledDisplay='Full Name'
        
      />
      <div className='flex flex-col gap-2 mb-4'>
        <Field
          className='mark-field'
          // @ts-ignore
          label={{
            children: (_: unknown, slotProps: InfoLabelProps) => (
              <div className='flex '>
                <InfoLabel
                  {...slotProps}
                  info={
                    <h3 className='text-sm w-[180px]'>
                      Nomor kamar wajib di isi jika customer adalah tamu hotel
                    </h3>
                  }
                >
                  No. Kamar
                </InfoLabel>
                {createOptionalRequired}
              </div>
            )
          }}
          validationMessage={errors.noBedroom ? errors.noBedroom.message : ""}
          validationState={errors.noBedroom ? "error" : "none"}
        >
          <Input
            disabled={customerType !== "hotel"}
            type='number'
            {...register("noBedroom")}
          />
        </Field>
        <Field
          required
          className='mark-fied mt-2'
          label='Payment Method'
        >
          <Select
            id={selectId}
            {...register("paymentMethod")}
          >
            {["cash", "unpaid"].map((s, index) => (
              <option key={index} value={s}>{s.toUpperCase()}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div>
        <Label>
          Tipe Customer <span className='text-red-600'>*</span>
        </Label>
        <MenuList
          className='w-fit flex mt-2'
          checkedValues={checkedValues}
          onCheckedValueChange={onChange}
        >
          <MenuItemRadio
            icon={<PersonArrowRightRegular />}
            name='customerType'
            value='incharge'
          >
            Incharge
          </MenuItemRadio>
          <MenuItemRadio
            icon={<PersonLockRegular />}
            name='customerType'
            value='gelora'
          >
            Gelora
          </MenuItemRadio>
          <MenuItemRadio
            icon={<HomePersonRegular />}
            name='customerType'
            value='hotel'
          >
            Hotel
          </MenuItemRadio>
        </MenuList>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-2'>
        <Button
          type='submit'
          appearance='secondary'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          appearance='primary'
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

type Props = {
  fieldProps: FieldProps;
  inputProps: InputProps;
  labelledDisplay?: string;
};

const FormGroup = (props: Props) => {
  const { inputProps, fieldProps } = props;

  return (
    <Field
      className='mark-field mb-4'
      {...fieldProps}
    >
      <Input {...inputProps} />
    </Field>
  );
};
