import { forwardRef, useImperativeHandle, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { NoDataFound } from "@ui/no-data-found";
import { MessagesContainerProps, TMessagesContainerRef } from "./types";
import { Loader } from "@ui/loader";
import { ScrollButton } from "@ui/scroll-button";
import s from "./messages-container.module.css";
import { useScrollControl } from "@hooks";

const ESTIMATED_ITEM_HEIGHT = 120;

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
      estimateSize: () => ESTIMATED_ITEM_HEIGHT,
      overscan: 5,
    });
    const virtualItems = virtualizer.getVirtualItems();

    const { scrollToBottom, scrollToIndex, showScrollButton } =
      useScrollControl({
        dataLength,
        virtualizer,
        parentRef,
        resetDep: resetScrollKey,
      });

    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom,
        scrollToIndex,
      }),
      [scrollToBottom, scrollToIndex]
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
      <div className={s.wrapper}>
        <div className={s.list} ref={parentRef}>
          <div
            className={s.scrollContainer}
            style={{ height: virtualizer.getTotalSize() }}
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
        <ScrollButton isShow={showScrollButton} onClick={scrollToBottom} />
      </div>
    );
  }
);
