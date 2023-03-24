"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const todoSlice_1 = __importDefault(require("./slice/todoSlice"));
const user_slice_1 = __importDefault(require("./slice/user.slice"));
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const reducer = (0, toolkit_1.combineReducers)({
    todoState: todoSlice_1.default,
    userState: user_slice_1.default
});
const store = (0, toolkit_1.configureStore)({
    reducer,
    middleware: [redux_thunk_1.default]
});
exports.default = store;
//# sourceMappingURL=index.js.map