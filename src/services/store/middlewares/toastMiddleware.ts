import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";
import { addToast } from "@slices/toast";
import { ErrorType, TErrorPayload } from "@types";

const toastListenerMiddleware = createListenerMiddleware();

toastListenerMiddleware.startListening({
  matcher: isRejected,
  effect: (action, { dispatch }) => {
    if (action.payload) {
      const payload: TErrorPayload = action.payload as TErrorPayload;

      if (payload.type === ErrorType.TOAST) {
        dispatch(
          addToast({
            type: "error",
            content: payload.message,
          })
        );
      } else if (payload.type === ErrorType.NONE) {
        console.error(`The error has been caught: ${payload.message}`);
      }
    } else {
      console.error("Rejected action без payload:", action);
    }
  },
});

export default toastListenerMiddleware;
