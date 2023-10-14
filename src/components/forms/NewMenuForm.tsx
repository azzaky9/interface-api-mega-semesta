import { ChangeEvent} from "react";
import { SubmitHandler } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { useMenu } from "../../context/MenuContext";
import { AddNewMenuForm } from "../../context/MenuContext";
import useInputMenu from "../../hooks/useInputMenu";
import { useFormsHelper } from "../../helpers/useFormHelper";
import DisplayError from "../utils/DisplayError";

const categories = ["foods", "baverage", "minibar", "etc"];
const groupMenu = ["Incharge", "Tamu Hotel"];

type Props = {
  handleClose: () => void;
};

export default function NewMenuForm({ handleClose }: Props) {
  const { formUtilities } = useMenu();
  const { generateUniqueId, insertMenu } = useInputMenu();
  const { getErr } = useFormsHelper();
  // const { handleChange, isActive, setIsActive } = useSwitch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors
  } = formUtilities;

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setValueName: keyof AddNewMenuForm
  ) => {
    if (errors[setValueName]) clearErrors(setValueName);

    setValue(setValueName, e.target.value);
  };

  const createOption = (listOption: string[]) => {
    const elementResult = listOption.map((option, index) => (
      <option
        key={index}
        value={option}
      >
        {option}
      </option>
    ));

    return elementResult;
  };

  console.log(errors);

  const shortenDisplayErr = (valueToCheck: keyof AddNewMenuForm) => {
    if (getErr<AddNewMenuForm>(errors, valueToCheck).isError) {
      <DisplayError
        message={getErr<AddNewMenuForm>(errors, valueToCheck).message}
      />;
    }

    return null;
  };

  const onsubmit: SubmitHandler<AddNewMenuForm> = async (value) => {
    const uid = generateUniqueId();

    console.log(value);

    await insertMenu.mutateAsync({
      data: {
        id: uid,
        name: value.name,
        category: value.category,
        groupMenu: value.groupMenu,
        price: Number(value.price)
      },
      insertType: value.category
    });

    handleClose();

    setTimeout(() => {
      clearAllState();
    }, 500);
  };

  const clearAllState = () => {
    const listValuetoClear = ["name", "category", "groupMenu", "price"];

    listValuetoClear.forEach((clearName) => {
      setValue(clearName as keyof AddNewMenuForm, "");
    });
  };

  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <FormGroup>
        <Label
          for='menu-name'
          className='text-gray-400 text-sm '
        >
          Nama menu
        </Label>
        <Input
          {...register("name", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "name"),
            required: {
              value: true,
              message: "Group menu must be required!"
            }
          })}
          invalid={errors.name !== undefined}
          id='menu-name'
          name='name'
          placeholder='Menu name'
          type='text'
        />
        {shortenDisplayErr("name")}
      </FormGroup>{" "}
      <FormGroup>
        <Label
          for='category'
          className='text-gray-400 text-sm'
        >
          Category
        </Label>
        <Input
          {...register("category", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "category"),
            required: {
              value: true,
              message: "Group menu must be required!"
            }
          })}
          invalid={errors.category !== undefined}
          id='category'
          name='category'
          placeholder='category'
          type='select'
        >
          {createOption(categories)}
        </Input>
        {shortenDisplayErr("category")}
      </FormGroup>{" "}
      <FormGroup>
        <Label
          for='groupMenu'
          className='text-gray-400 text-sm'
        >
          Kelompok Menu
        </Label>
        <Input
          {...register("groupMenu", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "groupMenu"),
            required: {
              value: true,
              message: "Group menu must be required!"
            }
          })}
          invalid={errors.groupMenu !== undefined}
          id='groupMenu'
          name='groupMenu'
          placeholder='Menu Untuk'
          type='select'
        >
          {createOption(groupMenu)}
        </Input>
        {shortenDisplayErr("groupMenu")}
      </FormGroup>
      <FormGroup>
        <Label
          for='price'
          className='text-gray-400 text-sm'
        >
          Harga
        </Label>
        <Input
          {...register("price", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "price"),
            required: true
          })}
          invalid={errors.price !== undefined}
          id='price'
          name='price'
          placeholder='Harga'
          type='number'
        />
        {shortenDisplayErr("price")}
      </FormGroup>
      <Button
        disabled={insertMenu.isLoading}
        className='mt-5 '
        color='primary'
        type='submit'
        onClick={() => handleSubmit(onsubmit)}
      >
        {insertMenu.isLoading && (
          <Spinner
            size='sm'
            className='me-2'
          />
        )}

        <span>Submit</span>
      </Button>
      {""}
    </Form>
  );
}
