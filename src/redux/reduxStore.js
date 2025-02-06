import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
  auth: authReducer,
  profilePage: profileReducer, 
  dialogsPage: dialogsReducer, 
  sidebar: sidebarReducer,
  usersPage: usersReducer
});

const store = configureStore({
  reducer: reducers,
})

export default store;