import { useCallback } from "react";
import { useDispatch } from "@store";
import { deleteMessageAsync, restoreMessageAsync } from "@thunks/dialogs";

export const useMessageActions = () => {
  const dispatch = useDispatch();

  const deleteMessage = useCallback(
    (messageId: string) => {
      dispatch(deleteMessageAsync(messageId));
    },
    [dispatch]
  );

  const restoreMessage = useCallback(
    (messageId: string) => {
      dispatch(restoreMessageAsync(messageId));
    },
    [dispatch]
  );

  return { deleteMessage, restoreMessage };
};
