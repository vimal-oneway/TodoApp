"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controller/todo.controller");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
router
    .route("/todo")
    .get(todo_controller_1.getTodo)
    .post(isAuth_1.isAuthenticatedUser, todo_controller_1.addTodo)
    .patch(isAuth_1.isAuthenticatedUser, todo_controller_1.updateTodo);
router.route("/todo/:todoId")
    .post(isAuth_1.isAuthenticatedUser, todo_controller_1.doneTodo)
    .delete(isAuth_1.isAuthenticatedUser, todo_controller_1.deleteTodo);
module.exports = router;
//# sourceMappingURL=todo.route.js.map