import BaseSelect, { GroupBase } from "react-select";
import "./select.css";
import { SelectProps } from "./type";

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  classNamePrefix,
  ...props
}: SelectProps<Option, IsMulti, Group>) => (
  <BaseSelect
    className={className || "react-select-container"}
    classNamePrefix={classNamePrefix || "react-select"}
    {...props}
  />
);
