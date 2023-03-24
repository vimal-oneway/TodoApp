import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  user: string;
  todoList: [{ task: string; done?: boolean }];
}

const TodoSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  todoList: [
    {
      task: {
        type: String,
        required: true,
      },
      done: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});
const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
export default Todo;
