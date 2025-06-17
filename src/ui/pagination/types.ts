export type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
};
