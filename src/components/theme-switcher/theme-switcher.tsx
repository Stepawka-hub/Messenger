import { useTheme } from "@hooks/useTheme";
import { Select } from "@ui/form-elements";
import { FC } from "react";
import { TOption } from "./types";

const themeOptions: TOption[] = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "system", label: "Системная" },
];

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  const onChange = (option: TOption | null) => {
    if (option) {
      setTheme(option.value);
    }
  };

  const selectedOption = themeOptions.find((option) => option.value === theme);

  return (
    <Select
      isSearchable={false}
      placeholder="Выберите тему"
      defaultValue={selectedOption}
      onChange={onChange}
      options={themeOptions}
    />
  );
};
