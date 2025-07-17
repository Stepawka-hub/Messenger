import BaseSelect, { GroupBase, StylesConfig } from "react-select";
import { SelectProps } from "./type";
import { useMemo } from "react";

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  classNamePrefix,
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  const selectStyles: StylesConfig<Option, IsMulti, Group> = useMemo(
    () => ({
      singleValue: (baseStyles) => ({
        ...baseStyles,
        color: "var(--primary-text-color)",
      }),
      control: (baseStyles, { isFocused }) => ({
        ...baseStyles,
        backgroundColor: "var(--primary-bg-color)",
        boxShadow: isFocused ? "var(--primary-color)" : "grey",
        borderColor: isFocused ? "var(--primary-color)" : "grey",
        "&:hover": {
          borderColor: isFocused ? "var(--primary-color)" : "grey",
        },
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "var(--primary-bg-color)",
      }),
      option: (baseStyles, { isSelected }) => ({
        ...baseStyles,
        backgroundColor: isSelected
          ? "var(--primary-color)"
          : "var(--primary-bg-color)",
        "&:hover": {
          backgroundColor: isSelected
            ? "var(--primary-color)"
            : "var(--select-option-hover)",
        },
        "&:active": {
          color: "var(--on-primary-color)",
          backgroundColor: isSelected
            ? "var(--primary-color)"
            : "var(--select-option-active)",
        },
      }),
    }),
    []
  );

  return (
    <BaseSelect
      styles={selectStyles}
      className={className || "react-select-container"}
      classNamePrefix={classNamePrefix || "react-select"}
      {...props}
    />
  );
};
