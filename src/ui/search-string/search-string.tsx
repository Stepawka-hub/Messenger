import { ChangeEvent, FC, useState } from "react";
import { useDebounce } from "@hooks";
import { SearchStringProps } from "./types";
import { SearchIcon } from "@icons";
import { Input } from "@ui/form-elements";
import s from "./search-string.module.css";

export const SearchString: FC<SearchStringProps> = ({
  initialValue,
  placeholder,
  onSearch,
}) => {
  const debouncedSearch = useDebounce(onSearch, 1000);
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className={s.inputContainer}>
      <SearchIcon className={s.icon} />
      <Input
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
