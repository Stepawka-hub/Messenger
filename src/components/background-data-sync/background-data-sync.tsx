import { usePolling } from "@hooks/usePolling";
import { getIsAuth } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { getNewMessageCountAsync } from "@thunks/dialogs";
import { FC, useCallback } from "react";

export const BackgroundDataSync: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  const getNewMessageCount = useCallback(async () => {
    try {
      await dispatch(getNewMessageCountAsync()).unwrap();
    } catch (error) {
      console.error("Error fetch new message count:", error);
    }
  }, [dispatch]);

  usePolling({ callback: getNewMessageCount, isEnabled: isAuth });

  return null;
};
