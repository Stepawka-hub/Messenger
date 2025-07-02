import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";
import { reducer as appReducer } from "@slices/app";
import { reducer as usersReducer } from "@slices/users";
import { reducer as profileReducer } from "@slices/profile";
import { reducer as authReducer } from "@slices/auth";
import { reducer as chatReducer } from "@slices/dialogs";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  chat: chatReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
