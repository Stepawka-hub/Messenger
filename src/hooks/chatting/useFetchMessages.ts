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
  scrollToBottom: () => void;
};

export const useFetchMessages = ({ userId, scrollToBottom }: TUseFetchMessagesProps) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const hasMore = useSelector(getHasMoreMessages);
  const { currentPage, pageSize } = useSelector(getMessagesPagination);
  const isLoading = useSelector(getIsLoadingMessages);

  const fetchMessages = useCallback(async () => {
    try {
      await dispatch(
        getMessagesAsync({ userId, pageSize, currentPage })
      ).unwrap();
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [dispatch, scrollToBottom, userId, pageSize, currentPage]);

  return { messages, hasMore, isLoading, fetchMessages };
};
