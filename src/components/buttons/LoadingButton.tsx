
type PropsLoadingButton = {
  isloading: string;
  text?: string;
  defaulticon?: JSX.Element;
};

export default function LoadingButton(props: PropsLoadingButton) {
  const { isloading, defaulticon, text } = props;

  const validateLoading = isloading === "true";

  return (
    <button
      className='flex justify-center items-center'
      disabled={validateLoading}
      {...props}
    >
      {validateLoading && (
        <p>Loading...</p>
      )}

      {defaulticon && !validateLoading ? (
        <span className='me-2 mb-0.5'>{defaulticon}</span>
      ) : null}

      <span>{text ? text : "Submit"}</span>
    </button>
  );
}
