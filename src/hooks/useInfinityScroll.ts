import { useCallback, useEffect, useRef } from "react";

export type TUseInfiniteScrollProps = {
  loadMore: () => void;
  hasMore: boolean;
};

export const useInfiniteScroll = ({
  loadMore,
  hasMore,
}: TUseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0]?.isIntersecting;
      if (isIntersecting && hasMore) {
        loadMore();
      }
    },
    [loadMore, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return loadMoreRef;
};
