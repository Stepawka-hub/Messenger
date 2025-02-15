import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
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
