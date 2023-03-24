"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneTodo = exports.deleteTodo = exports.updateTodo = exports.newTodo = exports.failed = exports.success = exports.request = exports.todoSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const todoLocalStore = localStorage.getItem("Todo");
const initialState = {
    loading: false,
    data: todoLocalStore && JSON.parse(localStorage.getItem("Todo") || " "),
};
exports.todoSlice = (0, toolkit_1.createSlice)({
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
_a = exports.todoSlice.actions, exports.request = _a.request, exports.success = _a.success, exports.failed = _a.failed, exports.newTodo = _a.newTodo, exports.updateTodo = _a.updateTodo, exports.deleteTodo = _a.deleteTodo, exports.doneTodo = _a.doneTodo;
exports.default = exports.todoSlice.reducer;
//# sourceMappingURL=todoSlice.js.map