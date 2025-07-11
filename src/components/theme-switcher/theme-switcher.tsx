import { useTheme } from "@hooks/useTheme";
import { Select } from "@ui/form-elements";
import { FC, useRef } from "react";
import { TOption } from "./types";
import { SelectInstance } from "react-select";

const themeOptions: TOption[] = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "system", label: "Системная" },
];

export const ThemeSwitcher: FC = () => {
  const selectRef = useRef<SelectInstance<TOption | null>>(null);
  const { theme, setTheme } = useTheme();
  const selectedOption = themeOptions.find((option) => option.value === theme);

  const onChange = (option: TOption | null) => {
    if (option) {
      setTheme(option.value);
    }
  };

  const onMenuClose = () => {
    selectRef.current?.blur();
  };

  return (
    <Select
      ref={selectRef}
      isSearchable={false}
      placeholder="Выберите тему"
      defaultValue={selectedOption}
      options={themeOptions}
      onChange={onChange}
      onMenuClose={onMenuClose}
    />
  );
};
