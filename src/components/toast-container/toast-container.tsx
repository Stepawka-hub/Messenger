import { getToasts, removeToast } from "@slices/toast";
import { useDispatch, useSelector } from "@store";
import { TToastWithKey } from "@types";
import { FC, memo, useCallback, useEffect } from "react";
import { ToastContainer as BaseToastContainer, toast } from "react-toastify";

export const ToastContainer: FC = memo(() => {
  const dispatch = useDispatch();
  const toasts = useSelector(getToasts);

  const displayToast = useCallback(
    (toastData: TToastWithKey) => {
      const { id, type, content, options } = toastData;
      toast[type](content, {
        ...options,
        autoClose: options?.autoClose || 2500,
        theme: options?.theme || "dark",
      });
      dispatch(removeToast(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (toasts.length > 0) {
      const toastData = toasts[0];
      displayToast(toastData);
    }
  }, [toasts, displayToast]);

  return <BaseToastContainer />;
});
