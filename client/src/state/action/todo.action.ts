import axios from "axios";
import {
  newTodo,
  failed,
  updateTodo,
  deleteTodo,
  doneTodo,
} from "../slice/todoSlice";
import { Dispatch } from "redux";
import { request, success } from "../slice/todoSlice";

export const addTodo = async (dispatch: Dispatch, todoData: any) => {
  try {
    const { data } = await axios.post("/api/v1/todo", { todoData });
    dispatch(newTodo(data.data));
  } catch (error: any) {
    console.log(error);
    dispatch(failed(error.response));
  }
};

export const updateTodoById = async (
  dispatch: Dispatch,
  value: string,
  id: string
) => {
  try {
    const { data } = await axios.patch("api/v1/todo", {
      todoTask: value,
      todoId: id,
    });
    dispatch(updateTodo(data.data));
  } catch (error: any) {
    dispatch(failed(error.response.data));
  }
};

export const deleteTodoById = async (dispatch: Dispatch, todoId: any) => {
  try {
    const { data } = await axios.delete(`api/v1/todo/${todoId}`);
    dispatch(deleteTodo(data.data));
  } catch (error: any) {
    dispatch(failed(error.response.data));
  }
};

export const doneTodoById = async (
  dispatch: Dispatch,
  todoId: string,
  done: boolean
) => {
  try {
    const { data } = await axios.post(`api/v1/todo/${todoId}`, { done });
    dispatch(doneTodo(data.data));
  } catch (error: any) {
    dispatch(failed(error.response.data));
  }
};

export const getTodo = async (dispatch: Dispatch, productId: string) => {
  try {
    dispatch(request());
    const { data } = await axios.put("/api/v1/todo", { productId });
    dispatch(success(data));
  } catch (error: any) {
    dispatch(failed(error.response.data));
  }
};
