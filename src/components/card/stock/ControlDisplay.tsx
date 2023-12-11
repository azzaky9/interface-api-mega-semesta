import React, { ChangeEvent } from "react";
import { Period } from "../../input/dates/DatePicker";
import { Button } from "@fluentui/react-components";
import { CalendarWeekNumbersRegular } from "@fluentui/react-icons";
import { RangeOption } from "../../input/dates/DatePicker";
import ControlledSelect from "../../select/ControlledSelect";

type DefaultValue = Date | null | undefined;

type Period = {
  from: DefaultValue;
  to: DefaultValue;
};

const rangeOption: RangeOption[] = ["Month", "Day", "Week", "WorkWeek"];

export default function ControlDisplay() {
  const [rangeBy, setRangeBy] = React.useState<RangeOption>("Month");
  // const [period, setPeriod] = React.useState<Period>({
  //   from: null,
  //   to: null
  // });

  const handleRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRangeBy(e.target.value as RangeOption);
  };

  return (
    <div className='bg-white flex justify-between rounded-md px-4 py-2 shadow-sm mb-5'>
      <div className='max-w-[428px] flex gap-5'>
        <Period
          rangeBy={rangeBy}
          placeholder={`Select Range by ${rangeBy}`}
        />
        <ControlledSelect
          options={rangeOption}
          value={rangeBy}
          onChange={handleRangeChange}
        />
      </div>

      <div>
        <Button
          icon={<CalendarWeekNumbersRegular />}
          iconPosition='after'
          appearance='secondary'
          size='medium'
        >
          Periode
        </Button>
      </div>
      {/* below implement period */}
    </div>
  );
}
