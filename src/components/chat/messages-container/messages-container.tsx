import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { useInitialScroll } from "@hooks";
import { useVirtualizer } from "@tanstack/react-virtual";
import { NoDataFound } from "@ui/no-data-found";
import {
  MessagesContainerProps,
  TMessagesContainerRef,
  TScrollToBottom,
  TScrollToIndex,
} from "./types";
import { Loader } from "@ui/loader";
import s from "./messages-container.module.css";

export const MessagesContainer = forwardRef<
  TMessagesContainerRef,
  MessagesContainerProps
>(
  (
    {
      dataLength,
      isLoading = false,
      hasMore = false,
      loadMoreRef,
      resetScrollKey,
      renderItem,
    },
    ref
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: dataLength,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 120,
      overscan: 5,
    });
    const virtualItems = virtualizer.getVirtualItems();

    const scrollToBottom = useCallback<TScrollToBottom>(() => {
      virtualizer.scrollToIndex(dataLength - 1, { align: "end" });
    }, [virtualizer, dataLength]);

    const scrollToIndex = useCallback<TScrollToIndex>(
      (value, options = { align: "start" }) => {
        virtualizer.scrollToIndex(value, options);
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

    useInitialScroll({
      dataLength,
      scrollToBottom,
      resetDep: resetScrollKey,
    });

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
          {hasMore && <div ref={loadMoreRef} />}
          <div
            className={s.itemsContainer}
            style={{
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {isLoading && <Loader />}
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
