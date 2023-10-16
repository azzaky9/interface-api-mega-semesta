import { Button, ButtonProps, Spinner } from "reactstrap";

type PropsLoadingButton = {
  isloading: string;
  text?: string;
  defaulticon?: JSX.Element;
};

export default function LoadingButton(props: PropsLoadingButton & ButtonProps) {
  const { isloading, defaulticon, text } = props;

  const validateLoading = isloading === "true";

  return (
    <Button
      className='flex justify-center items-center'
      disabled={validateLoading}
      {...props}
    >
      {validateLoading && (
        <Spinner
          size='sm'
          className='me-2'
        />
      )}

      {defaulticon && !validateLoading ? (
        <span className='me-2 mb-0.5'>{defaulticon}</span>
      ) : null}

      <span>{text ? text : "Submit"}</span>
    </Button>
  );
}
