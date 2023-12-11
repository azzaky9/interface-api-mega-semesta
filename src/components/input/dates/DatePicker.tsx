import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, makeStyles } from "@fluentui/react-components";
import { DateRangeType } from "@fluentui/react-calendar-compat";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

const useStyles = makeStyles({
  control: {
    maxWidth: "300px"
  }
});

type Props = {
  inputLabel?: string;
};
export type RangeOption = "Day" | "WorkWeek" | "Month" | "Week"  

type PeriodProps = {
  rangeBy: RangeOption;
};


export const Period = (props: PeriodProps & Partial<DatePickerProps>) => {
  const { rangeBy } = props;

  const getRangeType = DateRangeType[rangeBy];

  return (
    <DatePicker
      {...props}
      calendar={{
        dateRangeType: getRangeType
      }}
    />
  );
};

export const DatePickerInput = (props: Partial<DatePickerProps> & Props) => {
  const styles = useStyles();

  const { inputLabel } = props;

  return (
    <Field label={inputLabel ? inputLabel : ""}>
      <DatePicker
        className={styles.control}
        placeholder='Select a date...'
        {...props}
      />
    </Field>
  );
};
