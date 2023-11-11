import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, makeStyles } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

const useStyles = makeStyles({
  control: {
    maxWidth: "300px"
  }
});

type Props = {
  inputLabel?: string;
};

export const DatePickerInput = (props: Partial<DatePickerProps> & Props) => {
  const styles = useStyles();

  const { inputLabel } = props;

  return (
    <Field label={inputLabel ? inputLabel : "Select a date.."}>
      <DatePicker
        className={styles.control}
        placeholder='Select a date...'
        {...props}
      />
    </Field>
  );
};
