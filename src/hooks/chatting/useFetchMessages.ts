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
};

export const useFetchMessages = ({ userId }: TUseFetchMessagesProps) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const hasMore = useSelector(getHasMoreMessages);
  const { currentPage, pageSize } = useSelector(getMessagesPagination);
  const isLoading = useSelector(getIsLoadingMessages);

  const fetchMessages = useCallback(
    async () => {
      try {
        await dispatch(
          getMessagesAsync({ userId, pageSize, currentPage })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [dispatch, userId, pageSize, currentPage]
  );

  return { messages, hasMore, isLoading, fetchMessages };
};
