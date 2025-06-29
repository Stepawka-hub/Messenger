import { getSearchQuery, setSearchQuery } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { FC, memo, useCallback } from "react";
import { SearchString } from "@ui/search-string";

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
    <SearchString
      initialValue={searchQuery}
      placeholder="Enter username..."
      onSearch={handleSearch}
    />
  );
});
