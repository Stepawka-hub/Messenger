import { useCallback, useEffect, useRef } from "react";

export type TUseInfiniteScrollProps = {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
};

export const useInfiniteScroll = ({
  loadMore,
  hasMore,
  isLoading,
}: TUseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0]?.isIntersecting;
      if (isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return loadMoreRef;
};
