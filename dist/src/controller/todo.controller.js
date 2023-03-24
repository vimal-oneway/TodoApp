"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneTodo = exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodo = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const todo = yield todo_model_1.default.find({ user: userId });
    res.status(200).json({
        success: true,
        data: todo,
    });
});
exports.getTodo = getTodo;
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoData, userId } = req.body;
    let todo = yield todo_model_1.default.findOne({ user: userId });
    if (!todo) {
        const todo = yield todo_model_1.default.create({
            todoList: [{ task: todoData }],
            user: userId,
        });
        return res.status(200).json({ success: true, data: todo });
    }
    todo.todoList.push({ task: todoData });
    yield todo.save();
    return res.status(200).json({ success: true, data: todo });
});
exports.addTodo = addTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const todoId = req.params.todoId;
    try {
        let todo = yield todo_model_1.default.findOne({ user: userId });
        let newTodoList = todo.todoList.filter((v, i) => deleteCon(v, i, todoId));
        todo.todoList = newTodoList;
        yield todo.save();
        res.status(200).json({
            success: true,
            msg: "Task was deleted successfully",
            data: todo,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            msg: "Task was deleted failed",
        });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, todoTask, todoId } = req.body;
        let todo = yield todo_model_1.default.findOne({ user: userId });
        let isUpdate = false;
        for (let i = 0; i < todo.todoList.length; i++) {
            if (todo.todoList[i]._id.toString() == todoId) {
                todo.todoList[i].task = todoTask;
                isUpdate = true;
            }
        }
        if (!isUpdate)
            return next(new ErrorHandler_1.ErrorHandler(`unable to update`, 501));
        yield todo.save();
        res.status(200).json({
            success: true,
            data: todo,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            msg: `Unable to do now`,
        });
    }
});
exports.updateTodo = updateTodo;
const doneTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, done } = req.body;
        const { todoId } = req.params;
        console.log(done);
        let todo = yield todo_model_1.default.findOne({ user: userId });
        let isUpdate = false;
        for (let i = 0; i < todo.todoList.length; i++) {
            if (todo.todoList[i]._id.toString() == todoId) {
                todo.todoList[i].done = done;
                isUpdate = true;
            }
        }
        if (!isUpdate)
            return next(new ErrorHandler_1.ErrorHandler(`unable to update`, 501));
        yield todo.save();
        res.status(200).json({
            success: true,
            data: todo,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            msg: `Unable to do now`,
        });
    }
});
exports.doneTodo = doneTodo;
const deleteCon = (element, index, todoId) => {
    return element._id.toString() != todoId;
};
//# sourceMappingURL=todo.controller.js.map