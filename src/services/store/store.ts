import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from "react-redux";
import { reducer as appReducer } from "@slices/app";
import { reducer as usersReducer } from "@slices/users";
import { reducer as profileReducer } from "@slices/profile";
import { reducer as friendsReducer } from "@slices/friends";
import { reducer as authReducer } from "@slices/auth";
import { reducer as dialogsReducer } from "@slices/dialogs";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  dialogs: dialogsReducer,
  friends: friendsReducer,
  users: usersReducer,
  // form: formReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
