import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import {
  MessagesContainerProps,
  MessagesContainerRef,
  TScrollToIndex,
} from "./types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { NoDataFound } from "@ui/no-data-found";
import s from "./messages-container.module.css";
import { useInitialScroll } from "@hooks";

export const MessagesContainer = forwardRef<
  MessagesContainerRef,
  MessagesContainerProps
>(
  (
    { dataLength, isLoading = false, hasMore = false, loadMoreRef, renderItem },
    ref
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: dataLength,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 120,
    });
    const virtualItems = virtualizer.getVirtualItems();

    const scrollToBottom = useCallback(() => {
      virtualizer.scrollToIndex(dataLength - 1, { align: "end" });
    }, [virtualizer, dataLength]);

    const scrollToIndex = useCallback<TScrollToIndex>(
      (index: number, options = { align: "start" }) => {
        virtualizer.scrollToIndex(index, options);
      },
      [virtualizer]
    );

    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom,
        scrollToIndex,
      }),
      [scrollToBottom, scrollToIndex]
    );

    useInitialScroll({ dataLength, scrollToBottom });

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
            height: virtualizer.getTotalSize(),
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
