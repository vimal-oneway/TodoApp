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
exports.getTodo = exports.doneTodoById = exports.deleteTodoById = exports.updateTodoById = exports.addTodo = void 0;
const axios_1 = __importDefault(require("axios"));
const todoSlice_1 = require("../slice/todoSlice");
const todoSlice_2 = require("../slice/todoSlice");
const addTodo = (dispatch, todoData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.post("/api/v1/todo", { todoData });
        dispatch((0, todoSlice_1.newTodo)(data.data));
    }
    catch (error) {
        console.log(error);
        dispatch((0, todoSlice_1.failed)(error.response));
    }
});
exports.addTodo = addTodo;
const updateTodoById = (dispatch, value, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.patch("api/v1/todo", {
            todoTask: value,
            todoId: id,
        });
        dispatch((0, todoSlice_1.updateTodo)(data.data));
    }
    catch (error) {
        dispatch((0, todoSlice_1.failed)(error.response.data));
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (dispatch, todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.delete(`api/v1/todo/${todoId}`);
        dispatch((0, todoSlice_1.deleteTodo)(data.data));
    }
    catch (error) {
        dispatch((0, todoSlice_1.failed)(error.response.data));
    }
});
exports.deleteTodoById = deleteTodoById;
const doneTodoById = (dispatch, todoId, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.post(`api/v1/todo/${todoId}`, { done });
        dispatch((0, todoSlice_1.doneTodo)(data.data));
    }
    catch (error) {
        dispatch((0, todoSlice_1.failed)(error.response.data));
    }
});
exports.doneTodoById = doneTodoById;
const getTodo = (dispatch, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, todoSlice_2.request)());
        const { data } = yield axios_1.default.put("/api/v1/todo", { productId });
        dispatch((0, todoSlice_2.success)(data));
    }
    catch (error) {
        dispatch((0, todoSlice_1.failed)(error.response.data));
    }
});
exports.getTodo = getTodo;
//# sourceMappingURL=todo.action.js.map