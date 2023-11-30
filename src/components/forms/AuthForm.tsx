import { Button, Field, Input } from "@fluentui/react-components";
import useModal from "../../hooks/useModal";
import {
  ArrowHookUpRight20Regular,
  Eye24Regular,
  EyeOff24Regular
} from "@fluentui/react-icons";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm
} from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

type TAuthForm = {
  email: string;
  password: string;
};

export default function AuthForm() {
  const { authWithEmail } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<TAuthForm>();

  const onsubmit: SubmitHandler<TAuthForm> =  (formData) => {
    authWithEmail.mutate(formData)
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className='flex flex-col gap-6 mb-10'>
        <Field
          className='mark-field'
          required
          label='Email'
          validationState={errors.email ? "error" : undefined}
          validationMessage={
            errors.email ? (
              <span className='text-xs'>{errors.email.message}</span>
            ) : undefined
          }
        >
          <Input
            disabled={authWithEmail.isLoading}
            type='email'
            {...register("email", {
              required: {
                value: true,
                message: "Email must be required and must be include @ symbol"
              }
            })}
          />
        </Field>
        <PasswordInput
          errObj={errors}
          registerObj={register}
        />
      </div>
      <div className='flex flex-row-reverse gap-2 justify-between '>
        <Button
          type='submit'
          className='rounded-md'
          appearance='primary'
          onClick={() => console.log("signin")}
          icon={<ArrowHookUpRight20Regular />}
          iconPosition='after'
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}

type TPasswordInputProps = {
  registerObj: UseFormRegister<TAuthForm>;
  errObj: FieldErrors<TAuthForm>;
};

const PasswordInput: React.FC<TPasswordInputProps> = (props) => {
  const { authWithEmail } = useAuth();
  const { isOpen, toggleModal } = useModal();
  const { errObj, registerObj } = props;

  const toggle = toggleModal;

  return (
    <Field
      className='mark-field'
      required
      label='Password'
      validationState={errObj.password ? "error" : undefined}
      validationMessage={
        errObj.password ? (
          <span className='text-xs'>{errObj.password.message}</span>
        ) : undefined
      }
    >
      <Input
        disabled={authWithEmail.isLoading}
        {...registerObj("password", {
          required: { message: "Password must be required", value: true }
        })}
        contentAfter={
          isOpen ? (
            <Button
              icon={<Eye24Regular />}
              onClick={toggle}
              appearance='subtle'
              className='rounded-full'
            />
          ) : (
            <Button
              icon={<EyeOff24Regular onClick={toggle} />}
              onClick={toggle}
              appearance='transparent'
              className='rounded-full'
            />
          )
        }
        type={isOpen ? "text" : "password"}
      />
    </Field>
  );
};

export type { TAuthForm };
