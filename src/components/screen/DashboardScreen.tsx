import { createRef } from "react";
import OrderForm from "../forms/OrderForm";
import { Form } from "reactstrap";
import { useOrder } from "../../context/OrderContext";
import { ReducerInitialState } from "../../types/types";
import MenuList from "../menu/MenuList";
import PreviewOrderCard from "../card/PreviewOrderCard";

export default function DashboardScreen() {
  const ref = createRef<Form>();

  const { dispatch, state } = useOrder();

  const changePosition = () => {
    const togglingPosition =
      state.currentPosition === "choosen-option"
        ? "register"
        : "choosen-option";

    dispatch({
      type: "UPDATE_POSITION",
      payload: togglingPosition
    });
  };

  const getComponentByPosition = (
    position: ReducerInitialState["currentPosition"]
  ) => {
    switch (position) {
      case "register":
        return (
          <OrderForm
            changePosition={changePosition}
            ref={ref}
          />
        );
      case "choosen-option":
        return (
          <div className='px-5 grid py-10 grid-cols-5 gap-5'>
            <MenuList />
            <PreviewOrderCard />
          </div>
        );
    }
  };

  return (
    <div
      className={`h-full grid ${
        state.currentPosition === "choosen-option" ? "" : "place-content-center"
      }`}
    >
      {getComponentByPosition(state.currentPosition)}
    </div>
  );
}
