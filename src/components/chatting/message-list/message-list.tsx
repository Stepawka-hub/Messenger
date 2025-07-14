import { Message } from "@components/chatting";
import { useScroll } from "@hooks/useScroll";
import { getCurrentUser } from "@slices/auth";
import {
  getIsLoadingMessages,
  getMessagePagination,
  getMessages,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync } from "@thunks/dialogs";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { getRelativeTimeString } from "@utils/helpers/date";
import { isSameDay } from "date-fns";
import { FC, Fragment, memo, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { MessageListProps } from "./type";
import s from "./message-list.module.css";

export const MessageList: FC<MessageListProps> = memo(
  ({ userId, partnerAvatar }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const messages = useSelector(getMessages);
    const { currentPage, pageSize } = useSelector(getMessagePagination);
    const isLoading = useSelector(getIsLoadingMessages);
    const isMobile = useMediaQuery({ maxWidth: 600 });

    const parentRef = useRef<HTMLElement>(null);
    const childRef = useRef<HTMLDivElement>(null);
    useScroll(parentRef, childRef, () => null);

    useEffect(() => {
      dispatch(getMessagesAsync({ userId, pageSize, currentPage }));
    }, [dispatch, userId, pageSize, currentPage]);

    if (!messages || messages.length === 0) {
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
      <section className={s.list} ref={parentRef}>
        {isLoading ? <Loader /> : <div className={s.mark} ref={childRef} />}
        {messageElements}
      </section>
    );
  }
);
