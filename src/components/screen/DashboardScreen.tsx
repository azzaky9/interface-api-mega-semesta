import { createRef, useEffect, useState } from "react";
import OrderForm from "../forms/OrderForm";
import { Button, Form } from "reactstrap";
import { useOrder } from "../../context/OrderContext";
import {
  DataRequest as MenuDataState,
  ReducerInitialState
} from "../../types/types";
import MenuList from "../menu/MenuList";
import PreviewOrderCard from "../card/PreviewOrderCard";
import { useMenu } from "../../context/MenuContext";
import { useLocation } from "react-router-dom";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";

export default function DashboardScreen() {
  const ref = createRef<Form>();

  const { dispatch, state } = useOrder();
  const { menuDataQ } = useMenu();

  const { data } = menuDataQ;
  const { pathname } = useLocation();
  const modalUtils = useModal();

  const [menuState, setMenuState] = useState<MenuDataState[]>([]);

  const closeAndClear = () => {
    modalUtils.handleClose();

    dispatch({ type: "CLEAR" });
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
          <div className='flex flex-col'>
            <div className='ps-10 grid pt-5 pb-4 grid-cols-5 gap-x-10'>
              <MenuList dataMenu={menuState} />
              <PreviewOrderCard />
            </div>
            <div className='ms-10'>
              <Button
                color='danger'
                onClick={modalUtils.handleOpen}
              >
                Back
              </Button>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (data) {
      setMenuState(data?.flatMap((list) => list.list_menu));
    }
  }, [data]);

  useEffect(() => {
    if (pathname === "/") {
      dispatch({ type: "CLEAR" });
    }
  }, [pathname]);

  return (
    <div
      className={`h-full grid ${
        state.currentPosition === "choosen-option" ? "" : "place-content-center"
      }`}
    >
      {getComponentByPosition(state.currentPosition)}
      <Modal
        title='Konfirmasi Reset'
        {...modalUtils}
      >
        <div className='grid place-content-center'>
          <p className='underline mb-4 text-center text-gray-500'>
            Data customer serta semua order akan di reset, konfirmasi jika ingin
            melanjutkan.
          </p>
          <div className='flex justify-center gap-2'>
            <Button
              color='danger'
              className='danger'
              onClick={closeAndClear}
            >
              Konfirmasi
            </Button>
            <Button onClick={modalUtils.handleClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
