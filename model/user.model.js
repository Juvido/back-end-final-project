import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  posts: [{type: Types.ObjectId, ref: "Post"}],
  comments: [{type: Types.ObjectId, ref: "Comment"}],
  avatar: {type: String, default: "https://res.cloudinary.com/dig8rqnan/image/upload/v1684429771/pictures/file_e9bbjp.png" }
});

export const UserModel = model("User", userSchema);