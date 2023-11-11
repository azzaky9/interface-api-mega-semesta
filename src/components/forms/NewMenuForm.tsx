import { ChangeEvent } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMenu } from "../../context/MenuContext";
import { AddNewMenuForm } from "../../context/MenuContext";
import useInputMenu from "../../hooks/useInputMenu";
import { useFormsHelper } from "../../helpers/useFormHelper";
// import LoadingButton from "../buttons/LoadingButton";
import DisplayError from "../utils/DisplayError";

const categories = ["foods", "baverage", "rokok", "store", "etc"];
const groupMenu = ["Incharge", "Tamu Hotel"];

type Props = {
  handleClose: () => void;
};

export default function NewMenuForm({ handleClose }: Props) {
  const { formUtilities, menuDataQ } = useMenu();
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
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label className='text-gray-400 text-sm '>Nama menu</label>
        <input
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
        {shortenDisplayErr("name")}
      </div>{" "}
      <div>
        <label className='text-gray-400 text-sm'>Category</label>
        <input
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
          type='select'
        >
          {createOption(categories)}
        </input>
        {shortenDisplayErr("category")}
      </div>{" "}
      <div>
        <label className='text-gray-400 text-sm'>Kelompok Menu</label>
        <input
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
          type='select'
        >
          {createOption(groupMenu)}
        </input>
        {shortenDisplayErr("groupMenu")}
      </div>
      <div>
        <label className='text-gray-400 text-sm'>Harga</label>
        <input
          {...register("price", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "price"),
            required: true
          })}
          id='price'
          name='price'
          placeholder='Harga'
          type='number'
        />
        {shortenDisplayErr("price")}
      </div>
      {/* <LoadingButton
        color='success'
        className='mt-5'
        type='submit'
        onClick={() => handleSubmit(onsubmit)}
        isloading={String(insertMenu.isLoading)}
      /> */}
      {""}
    </form>
  );
}
