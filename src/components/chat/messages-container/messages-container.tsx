import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { MessagesContainerProps, MessagesContainerRef } from "./types";
import { TScrollInfo } from "@components/chat";
import { useVirtualizer } from "@tanstack/react-virtual";
import { NoDataFound } from "@ui/no-data-found";
import s from "./messages-container.module.css";

export const MessagesContainer = forwardRef<
  MessagesContainerRef,
  MessagesContainerProps
>(
  (
    { dataLength, isLoading = false, hasMore = false, loadMoreRef, renderItem },
    ref
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<TScrollInfo>(null);

    const virtualizer = useVirtualizer({
      count: dataLength,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 100,
      overscan: 5,
    });
    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
      if (dataLength && scrollRef?.current) {
        const { index, options } = scrollRef.current;
        virtualizer.scrollToIndex(index, { align: options?.align });
      }
    }, [virtualizer, scrollRef, dataLength]);

    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom: () => {
          virtualizer.scrollToIndex(dataLength - 1, { align: "end" });
        },
      }),
      [virtualizer, dataLength]
    );

    if (!dataLength && !isLoading && !hasMore) {
      return (
        <NoDataFound
          label="Список сообщений пуст"
          classes={{ container: s.noData }}
        />
      );
    }

    return (
      <div ref={parentRef} className={s.list}>
        <div
          className={s.scrollContainer}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
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
        </div>
      </div>
    );
  }
);
