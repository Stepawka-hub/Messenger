// import { getSearchQuery, setSearchQuery } from "@slices/search";
import { useDispatch, useSelector } from "@store";
import { FC, memo, useCallback } from "react";
import { SearchString } from "../search-string";
import s from "./search.module.css";

export const Search: FC = memo(() => {
  const dispatch = useDispatch();
  // const searchQuery = useSelector(getSearchQuery);

  const handleSearch = useCallback(
    (query: string) => {
      // dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  return (
    <div className={s.search}>
      <SearchString
        initialValue={"123"}
        placeholder="Enter username..."
        onSearch={handleSearch}
      />
    </div>
  );
});
