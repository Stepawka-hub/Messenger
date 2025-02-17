import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './reducers/appReducer';
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import usersReducer from "./reducers/usersReducer";
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
