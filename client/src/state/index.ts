import { configureStore, combineReducers } from "@reduxjs/toolkit";

import todoReducer from "./slice/todoSlice";
import userReducer  from './slice/user.slice'
import thunk from "redux-thunk";

const reducer = combineReducers({
  todoState : todoReducer,
  userState : userReducer
})

const store = configureStore({
  reducer,
  middleware:[thunk]
});

export default store;

export type RootState = ReturnType<typeof store.getState>;