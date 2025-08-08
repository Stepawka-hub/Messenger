import { FC, useEffect, useRef } from "react";
import { MessagesContainerAltProps } from "./types";
import { ScrollToOptions, useVirtualizer } from "@tanstack/react-virtual";
import s from "./messages-container-alt.module.css";
import { NoDataFound } from "@ui/no-data-found";

type ScrollInfo = {
  index: number;
  options?: ScrollToOptions;
};

export const MessagesContainerAlt: FC<MessagesContainerAltProps> = ({
  dataLength,
  isLoading = false,
  hasMore = false,
  loadMoreRef,
  bottomListRef,
  renderItem,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<ScrollInfo>(null);

  const virtualizer = useVirtualizer({
    count: dataLength,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  useEffect(() => {
    if (dataLength && scrollRef.current) {
      const { index, options } = scrollRef.current;
      virtualizer.scrollToIndex(index, { align: options?.align });
    }
  }, [virtualizer, dataLength]);

  if (!dataLength && !isLoading && !hasMore) {
    return (
      <NoDataFound
        label="Список сообщений пуст"
        classes={{ container: s.noData }}
      />
    );
  }

  const virtualItems = virtualizer.getVirtualItems();

  console.log(virtualItems);

  return (
    <div ref={parentRef} className={s.list}>
      <div
        className={s.relative}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <div ref={loadMoreRef} />
        <div
          className={s.itemsContainer}
          style={{
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map(({ key, index }) => (
            <div
              className={s.item}
              key={key}
              data-index={index}
              ref={virtualizer.measureElement}
            >
              {renderItem(index)}
            </div>
          ))}
        </div>
        <div id="bottom" ref={bottomListRef} />
      </div>
    </div>
  );
};
