import {
  getHasMoreMessages,
  getIsLoadingMessages,
  getMessagePagination,
  getMessages,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync } from "@thunks/dialogs";
import { TMessage } from "@types";
import { useCallback } from "react";

type TUseFetchMessagesProps = {
  userId: number;
};

type TUseFetchMessagesReturn = {
  messages: TMessage[];
  hasMore: boolean;
  isLoading: boolean;
  fetchMessages: () => void;
};

export const useFetchMessages = ({
  userId,
}: TUseFetchMessagesProps): TUseFetchMessagesReturn => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const hasMore = useSelector(getHasMoreMessages);
  const { currentPage, pageSize } = useSelector(getMessagePagination);
  const isLoading = useSelector(getIsLoadingMessages);

  const fetchMessages = useCallback(() => {
    dispatch(getMessagesAsync({ userId, pageSize, currentPage }));
  }, [dispatch, userId, pageSize, currentPage]);

  return { messages, hasMore, isLoading, fetchMessages };
};
