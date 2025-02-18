import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import sidebarReducer from './sidebar/reducer';
import dialogsReducer from './dialogs/reducer';
import usersReducer from './users/reducer';
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  form: formReducer,
});

const store = configureStore({
  reducer: reducers,
});

window.store = store

export default store;
