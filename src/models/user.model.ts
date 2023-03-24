import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  userName: string;
  googleId: string;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  googleId: { type: String, required: true, select: false },
  avatar: { type: String, required: true },
  todo: { type: mongoose.Schema.Types.ObjectId, ref: "Todo", required: false },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default  User;
