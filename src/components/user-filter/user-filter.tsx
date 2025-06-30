import { getFilter, setFilter } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { ChangeEvent, FC } from "react";
import { UserFilterProps } from "./types";
import { TUserFilter } from "@types";
import { Radio } from "@ui/form-elements";
import s from "./user-filter.module.css";

export const UserFilter: FC<UserFilterProps> = ({ callback }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TUserFilter;
    dispatch(setFilter(value));
    callback();
  };

  return (
    <div role="radiogroup" aria-label="Отобразить">
      <h2 className={s.title}>Отобразить</h2>
      <fieldset className={s.fieldset}>
        <Radio
          id="all"
          name="filter"
          label="Всех пользователей"
          value="all"
          onChange={handleChange}
          checked={filter === "all"}
        />
        <Radio
          id="friends"
          name="filter"
          label="Моих друзей"
          value="friends"
          onChange={handleChange}
          checked={filter === "friends"}
        />
        <Radio
          id="nofriends"
          name="filter"
          label="Пользователей, на которых я не подписан"
          value="nofriends"
          onChange={handleChange}
          checked={filter === "nofriends"}
        />
      </fieldset>
    </div>
  );
};
