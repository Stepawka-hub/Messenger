import { TMessagesContainer } from "@components/chat/messages-container/types";
import {
  getHasMoreMessages,
  getIsLoadingMessages,
  getMessagesPagination,
  getMessages,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync } from "@thunks/dialogs";
import { useCallback } from "react";

type TUseFetchMessagesProps = {
  userId: number;
  container: TMessagesContainer;
};

export const useFetchMessages = ({
  userId,
  container,
}: TUseFetchMessagesProps) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const hasMore = useSelector(getHasMoreMessages);
  const { currentPage, pageSize } = useSelector(getMessagesPagination);
  const isLoading = useSelector(getIsLoadingMessages);

  const fetchMessages = useCallback(async () => {
    try {
      const { items } = await dispatch(
        getMessagesAsync({ userId, pageSize, currentPage })
      ).unwrap();

      container.current?.scrollToIndex(items.length);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [dispatch, container, userId, pageSize, currentPage]);

  return { messages, hasMore, isLoading, fetchMessages };
};
