import { Locals, NextFunction, Request, Response } from "express";
import Todo, { ITodo } from "../models/todo.model";
import User from "../models/user.model";
import mongoose from "mongoose";
import { ErrorHandler } from "../utils/ErrorHandler";

export const getTodo = async (
  req: Request<string, any>,
  res: Response<any>,
  next: NextFunction
) => {
  const { userId } = req.body;
  const todo = await Todo.find({ user: userId });
  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const addTodo = async (
  req: Request<string, any>,
  res: Response<any>,
  next: NextFunction
) => {
  const { todoData, userId } = req.body;

  let todo: any = await Todo.findOne({ user: userId });

  if (!todo) {
    const todo = await Todo.create({
      todoList: [{ task: todoData }],
      user: userId,
    });
    return res.status(200).json({ success: true, data: todo });
  }

  todo.todoList.push({ task: todoData });
  await todo.save();
  return res.status(200).json({ success: true, data: todo });
};

export const deleteTodo = async (
  req: Request<any>,
  res: Response<Locals, any>,
  next: NextFunction
) => {
  const { userId } = req.body;
  const todoId: string = req.params.todoId;
  try {
    let todo: any = await Todo.findOne({ user: userId });
    let newTodoList = todo.todoList.filter((v: any, i: number) =>
      deleteCon(v, i, todoId)
    );
    todo.todoList = newTodoList;
    await todo.save();
    res.status(200).json({
      success: true,
      msg: "Task was deleted successfully",
      data: todo,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: "Task was deleted failed",
    });
  }
};

export const updateTodo = async (
  req: Request<string, any>,
  res: Response<any>,
  next: NextFunction
) => {
  try {
    const { userId, todoTask, todoId } = req.body;
    let todo: any = await Todo.findOne({ user: userId });
    let isUpdate: boolean = false;

    for (let i: number = 0; i < todo.todoList.length; i++) {
      if (todo.todoList[i]._id.toString() == todoId) {
        todo.todoList[i].task = todoTask;
        isUpdate = true;
      }
    }

    if (!isUpdate) return next(new ErrorHandler(`unable to update`, 501));
    await todo.save();
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: `Unable to do now`,
    });
  }
};

export const doneTodo = async (
  req: Request<any>,
  res: Response<any>,
  next: NextFunction
) => {
  try {
    const { userId, done } = req.body;
    const { todoId } = req.params;
    console.log(done);
    
    let todo: any = await Todo.findOne({ user: userId });
    let isUpdate: boolean = false;

    for (let i: number = 0; i < todo.todoList.length; i++) {
      if (todo.todoList[i]._id.toString() == todoId) {
        todo.todoList[i].done = done;
        isUpdate = true;
      }
    }

    if (!isUpdate) return next(new ErrorHandler(`unable to update`, 501));
    await todo.save();
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: `Unable to do now`,
    });
  }
};

const deleteCon = (element: any, index: number, todoId: string) => {
  return element._id.toString() != todoId;
};
