// on development ..

import { FieldErrors } from "react-hook-form";

// type onChange<T> = (e: ChangeEvent<HTMLInputElement>, setValueName: T) => void;

function useFormsHelper() {
  function getErr<T>(errState: FieldErrors<any>, valueToCheck: keyof T) {
    const isError = errState[valueToCheck] !== undefined;
    const message = isError ? errState[valueToCheck]?.message : "";

    console.log(errState[valueToCheck]?.message);

    return { isError, message: message };
  }

  return { getErr };
}

export { useFormsHelper };
