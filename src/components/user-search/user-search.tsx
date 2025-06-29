import { FilterIcon } from "@icons";
import { getSearchQuery, setSearchQuery } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { SearchString } from "@ui/search-string";
import { FC, memo, useCallback } from "react";
import s from "./user-search.module.css";
import { useModal } from "@hooks/useModal";

export const UserSearch: FC = memo(() => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const { showModal } = useModal();

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleFilterClick = useCallback(() => {
    showModal(
      <ul>
        <li>Все</li>
        <li>Друзья</li>
      </ul>
    );
  }, [showModal]);

  return (
    <div className={s.search}>
      <SearchString
        initialValue={searchQuery}
        placeholder="Enter username..."
        onSearch={handleSearch}
      />
      <button className={s.filterBtn} onClick={handleFilterClick}>
        <FilterIcon className={s.filterIcon} />
      </button>
    </div>
  );
});
