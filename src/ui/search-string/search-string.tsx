import { SearchIcon } from "@icons"
import { useDebounce } from "@hooks/useDebounce";
import { ChangeEvent, FC, useState } from "react";
import s from "./search-string.module.css";
import { SearchStringProps } from './types';
import { Input } from '@ui/form-elements';

export const SearchString: FC<SearchStringProps> = ({ initialValue, placeholder, onSearch }) => {
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
