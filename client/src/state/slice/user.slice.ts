import { InitialUserState } from "../../types/redux/todo.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialUserState = {
  loading: false,
  user: JSON.parse(JSON.stringify(localStorage.getItem("user"))),
};

export const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    request: (state:InitialUserState) => {
      state.loading = true;
    },

    success: (state:InitialUserState, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state:InitialUserState) => {
      state.loading = false;
      localStorage.clear();
    },

    failed: (state:InitialUserState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { request, success, failed, logout } = userSlice.actions;

export default userSlice.reducer;
