import express, { Router } from "express";
import { addTodo, deleteTodo, doneTodo, getTodo, updateTodo } from "../controller/todo.controller";
import { authenticate } from "passport";
import { isAuthenticatedUser } from "../middleware/isAuth";

const router: Router = express.Router();

router
  .route("/todo")
  .get(getTodo)
  .post(isAuthenticatedUser, addTodo)
  .patch(isAuthenticatedUser, updateTodo);

router.route("/todo/:todoId")
.post(isAuthenticatedUser, doneTodo)
.delete(isAuthenticatedUser, deleteTodo);
export = router;
