import { Message } from "@components/chatting";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";
import { getCurrentUser } from "@slices/auth";
import {
  getHasMoreMessages,
  getIsLoadingMessages,
  getMessagePagination,
  getMessages,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { getRelativeTimeString } from "@utils/helpers/date";
import { isSameDay } from "date-fns";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import s from "./message-list.module.css";
import { MessageListProps } from "./type";
import { getMessagesAsync } from "@thunks/dialogs";

export const MessageList: FC<MessageListProps> = memo(
  ({ userId, partnerAvatar }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const isMobile = useMediaQuery({ maxWidth: 600 });

    const messages = useSelector(getMessages);
    const hasMore = useSelector(getHasMoreMessages);
    const { currentPage, pageSize } = useSelector(getMessagePagination);
    const isLoading = useSelector(getIsLoadingMessages);

    const fetchMessages = useCallback(() => {
      console.log(pageSize, currentPage);
      dispatch(getMessagesAsync({ userId, pageSize, currentPage }));
    }, [dispatch, userId, pageSize, currentPage]);

    const messageListRef = useRef<HTMLDivElement>(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const loadMoreRef = useInfiniteScroll({ loadMore: fetchMessages, hasMore });

    useEffect(() => {
      const listRef = messageListRef.current;
      if (listRef && messages.length > 0 && isFirstLoad) {
        listRef.lastElementChild?.scrollIntoView();
        setIsFirstLoad(false);
      }
    }, [messages, isFirstLoad]);

    if (!messages.length && !hasMore) {
      return <NoDataFound label="Список сообщений пуст" className={s.noData} />;
    }

    const messageElements = messages.map((m, index) => {
      const isMessageOwner = m.senderId === currentUser?.id;
      const isNext = index < messages.length - 1;
      const showSeparator =
        isNext && !isSameDay(messages[index + 1].addedAt, m.addedAt);

      return (
        <Fragment key={m.id}>
          <Message
            senderId={m.senderId}
            content={m.body}
            username={m.senderName}
            addedAt={m.addedAt}
            isViewed={m.viewed}
            photo={isMessageOwner ? currentUser.photos?.small : partnerAvatar}
            isOwnMessage={isMessageOwner}
            isMobile={isMobile}
          />
          {showSeparator && (
            <div>{getRelativeTimeString(messages[index + 1].addedAt)}</div>
          )}
        </Fragment>
      );
    });

    return (
      <section className={s.list} ref={messageListRef}>
        {isLoading && <Loader />}
        {hasMore && <div className={s.loadMore} ref={loadMoreRef} />}
        {messageElements}
      </section>
    );
  }
);
