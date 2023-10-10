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

  const getComponentByPosition = (
    position: ReducerInitialState["currentPosition"]
  ) => {
    switch (position) {
      case "register":
        return <OrderForm ref={ref} />;
      case "choosen-option":
        return (
          <div className="flex gap-3" >
            <MenuList />
            <PreviewOrderCard />
          </div>
        );
    }
  };

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

  return (
    <div className='h-full grid place-content-center '>
      {getComponentByPosition(state.currentPosition)}
      <button onClick={changePosition}>Next</button>
    </div>
  );
}
