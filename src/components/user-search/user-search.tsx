import { FilterIcon } from "@icons";
import { getSearchQuery, setSearchQuery } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { SearchString } from "@ui/search-string";
import { FC, memo, useCallback } from "react";
import s from "./user-search.module.css";

export const UserSearch: FC = memo(() => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  return (
    <div className={s.search}>
      <SearchString
        initialValue={searchQuery}
        placeholder="Enter username..."
        onSearch={handleSearch}
      />
      <button className={s.filterBtn} onClick={() => alert("FilterBy")}>
        <FilterIcon className={s.filterIcon} />
      </button>
    </div>
  );
});
