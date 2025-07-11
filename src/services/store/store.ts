import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";
import { reducer as appReducer } from "@slices/app";
import { reducer as toastReducer } from "@slices/toast";
import { reducer as usersReducer } from "@slices/users";
import { reducer as profileReducer } from "@slices/profile";
import { reducer as authReducer } from "@slices/auth";
import { reducer as dialogsReducer } from "@slices/dialogs";
import { reducer as chatReducer } from "@slices/chat";
import toastListenerMiddleware from "./middlewares/toastMiddleware";

const rootReducer = combineReducers({
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
    getDefaultMiddleware().prepend(toastListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
