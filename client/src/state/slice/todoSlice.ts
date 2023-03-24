import { InitialState } from "../../types/redux/todo.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todoLocalStore = localStorage.getItem("Todo");

const initialState: InitialState = {
  loading: false,
  data: todoLocalStore && JSON.parse(localStorage.getItem("Todo") || " "),
};

export const todoSlice = createSlice({
  name: "Todo",
  initialState: initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      localStorage.setItem("Todo", JSON.stringify(state.data));
    },

    newTodo: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      localStorage.setItem("Todo", JSON.stringify(action.payload));
    },

    updateTodo: (state, action) => {
      state.loading = true;
      localStorage.setItem("Todo", JSON.stringify(action.payload));
      state.data = action.payload;
    },

    deleteTodo: (state, action) => {
      state.loading = true;
      localStorage.setItem("Todo", JSON.stringify(action.payload));
      state.data = action.payload;
    },

    doneTodo: (state, action) => {
      state.loading = true;
      localStorage.setItem("Todo", JSON.stringify(action.payload));
      state.data = action.payload;
    },

    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  request,
  success,
  failed,
  newTodo,
  updateTodo,
  deleteTodo,
  doneTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
