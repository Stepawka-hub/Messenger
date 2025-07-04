import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ErrorType, TErrorPayload } from "@types";

const toastListenerMiddleware = createListenerMiddleware();

toastListenerMiddleware.startListening({
  matcher: isRejected,
  effect: (action) => {
    if (action.payload) {
      const payload: TErrorPayload = action.payload as TErrorPayload;

      if (payload.type === ErrorType.TOAST) {
        toast.error(payload.message);
      } else if (payload.type === ErrorType.NONE) {
        console.error(`The error has been caught: ${payload.message}`);
      }
    } else {
      console.error("Rejected action без payload:", action);
    }
  },
});

export default toastListenerMiddleware;
