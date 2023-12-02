import { ChangeEvent } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMenu } from "../../context/MenuContext";
import { AddNewMenuForm } from "../../context/MenuContext";
import useInputMenu from "../../hooks/useInputMenu";
// import { useFormsHelper } from "../../helpers/useFormHelper";
// import LoadingButton from "../buttons/LoadingButton";
import {
  Button,
  Field,
  Input,
  Select,
  Tooltip
} from "@fluentui/react-components";
import { AddSquareRegular } from "@fluentui/react-icons";
import { X } from "lucide-react";

const categories = ["foods", "baverage", "rokok", "store", "etc"];
const groupMenu = ["Incharge", "Tamu Hotel", "Gelora"];

type Props = {
  handleClose: () => void;
};

export default function NewMenuForm({ handleClose }: Props) {
  const { formUtilities, menuDataQ } = useMenu();
  const { generateUniqueId, insertMenu } = useInputMenu();
  // const { getErr } = useFormsHelper();
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

  // used later !
  // const shortenDisplayErr = (valueToCheck: keyof AddNewMenuForm) => {
  //   if (getErr<AddNewMenuForm>(errors, valueToCheck).isError) {
  //     <DisplayError
  //       message={getErr<AddNewMenuForm>(errors, valueToCheck).message}
  //     />;
  //   }

  //   return null;
  // };

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

    await menuDataQ.refetch();

    handleClose();

    setTimeout(() => {
      clearAllState();
    }, 500);
  };

  const clearAllState = () => {
    const listValuetoClear = ["name", "price"];

    listValuetoClear.forEach((clearName) => {
      setValue(clearName as keyof AddNewMenuForm, "");
    });

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className='grid grid-cols-1 gap-4'>
        <Field label='Nama Menu'>
          <Input
            {...register("name", {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "name"),
              required: {
                value: true,
                message: "Group menu must be required!"
              }
            })}
            id='menu-name'
            name='name'
            placeholder='Menu name'
            type='text'
          />
        </Field>
        <Field label='Category'>
          <Select
            {...register("category", {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "category"),
              required: {
                value: true,
                message: "Group menu must be required!"
              }
            })}
            id='category'
            name='category'
            placeholder='category'
          >
            {createOption(categories)}
          </Select>
        </Field>

        <Field label='Kelompok menu'>
          <Select
            {...register("groupMenu", {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "groupMenu"),
              required: {
                value: true,
                message: "Group menu must be required!"
              }
            })}
            id='groupMenu'
            name='groupMenu'
            placeholder='Menu Untuk'
          >
            {createOption(groupMenu)}
          </Select>
        </Field>
        <Field label='Harga menu'>
          <Input
            {...register("price", {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "price"),
              required: true
            })}
            id='price'
            name='price'
            placeholder='Harga'
            type='number'
            contentBefore='Rp'
          />
        </Field>
      </div>
      <div className='mt-8 flex flex-reverse w-full gap-2 '>
        <Tooltip
          positioning='below'
          content='Check semua data sebelum melakukan pembuatan menu'
          relationship='description'
          appearance='inverted'
        >
          <Button
            className='w-full'
            icon={<AddSquareRegular />}
            iconPosition='after'
            appearance='primary'
            type='submit'
          >
            Create
          </Button>
        </Tooltip>
        <Button
          onClick={clearAllState}
          className='w-full'
          icon={<X />}
          iconPosition='after'
          appearance='outline'
        >
          Close
        </Button>
      </div>

      {""}
    </form>
  );
}
