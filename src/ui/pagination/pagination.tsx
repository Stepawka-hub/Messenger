import { FC } from "react";
import { PaginationProps } from "./types";
import s from "./pagination.module.css";
import clsx from "clsx";

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const firstPage = Math.max(0, currentPage - 4);
  const lastPage = Math.min(pagesCount, currentPage + 3);

  const pages = [];
  for (let i = firstPage; i < lastPage; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={s.pagination}>
      {pages.map((number) => (
        <span
          key={number}
          className={clsx(s.item, { [s.active]: currentPage === number })}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </span>
      ))}
    </div>
  );
};
