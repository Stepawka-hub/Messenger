import { FC } from "react";
import s from "./pagination.module.css";
import { PaginationProps } from "./types";
import clsx from "clsx";

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const firstPage = currentPage - 4 < 0 ? 0 : currentPage - 4;
  const lastPage = currentPage + 3;
  const slicedPages = pages.slice(firstPage, lastPage);

  return (
    <div className={s.pagination}>
      {slicedPages.map((number) => (
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
