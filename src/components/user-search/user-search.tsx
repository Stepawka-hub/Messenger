import { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "@store";
import { getSearchQuery, setCurrentPage, setSearchQuery } from "@slices/users";
import { useModal } from "@hooks";
import { UserFilter } from "@components/user-filter";
import { FilterIcon } from "@icons";
import { Button } from "@ui/button";
import { SearchString } from "@ui/search-string";
import s from "./user-search.module.css";

export const UserSearch: FC = memo(() => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const { showModal, hideModal } = useModal();

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  const handleFilterClick = useCallback(() => {
    showModal(<UserFilter callback={hideModal} />);
  }, [showModal, hideModal]);

  return (
    <div className={s.search}>
      <SearchString
        initialValue={searchQuery}
        placeholder="Enter username..."
        onSearch={handleSearch}
      />
      <Button
        aria-label="Фильтр"
        title="Фильтр"
        className={s.filterBtn}
        onClick={handleFilterClick}
      >
        <FilterIcon className={s.filterIcon} />
      </Button>
    </div>
  );
});
