import s from './Pagination.module.css';

const Pagination = ({totalUsersCount, pageSize, currentPage, setCurrentPage}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const firstPage = ((currentPage - 4) < 0) ? 0 : currentPage - 4;
  const lastPage = currentPage + 3;
  const slicedPages = pages.slice(firstPage, lastPage);

  return (
    <div className={s.pagination}>
      {
        slicedPages.map((number) =>
          <span
            className={`${s.pagination__item} ${currentPage === number && s.active}`}
            onClick={() => setCurrentPage(number)}
            key={number}
          >
            {number}
          </span>
        )
      }
    </div>
  );
}

export default Pagination;