import { ChangeEvent, useState } from "react";

type Switches = "on" | "off";

const useSwitch = () => {
  const [isActive, setIsActive] = useState<Switches>("off");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value as Switches;
    const setValue = eValue === "on" ? "off" : "on";

    setIsActive(setValue as Switches);
  };

  return { handleChange, isActive, setIsActive };
};

export { type Switches, useSwitch };
