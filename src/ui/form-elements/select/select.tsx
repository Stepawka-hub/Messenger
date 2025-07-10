import BaseSelect, { GroupBase, Props } from "react-select";
import s from "./select.module.css";
import clsx from "clsx";

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  ...props
}: Props<Option, IsMulti, Group>) => (
  <BaseSelect className={clsx(className, s.select)} {...props} />
);
