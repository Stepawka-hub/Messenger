import { Ref } from "react";
import {
  Props as BaseSelectProps,
  GroupBase,
  SelectInstance,
} from "react-select";

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = BaseSelectProps<Option, IsMulti, Group> & {
  ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
};
