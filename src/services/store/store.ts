import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { reducer as appReducer } from "@slices/app";
import { reducer as authReducer } from "@slices/auth";
import { reducer as chatReducer } from "@slices/chat";
import { reducer as dialogsReducer } from "@slices/dialogs";
import { reducer as profileReducer } from "@slices/profile";
import { reducer as toastReducer } from "@slices/toast";
import { reducer as usersReducer } from "@slices/users";
import { Socket } from "@utils/socket";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import toastListenerMiddleware from "./middlewares/toastMiddleware";

export const rootReducer = combineReducers({
  app: appReducer,
  toast: toastReducer,
  auth: authReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  chat: chatReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(toastListenerMiddleware.middleware)
      .concat(socketMiddleware(new Socket())),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<object, RootState>;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
