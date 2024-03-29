import { Schema, model, Types} from "mongoose";

const postSchema = new Schema({
  name: { type: String, trim: true, minLength: 3 },
  notes: { type: String, trim: true, minLength: 1, maxLength: 200 },
  ingredients: {type: String, trim: true, minLength: 1, maxLength: 200 }, 
  store: { type: String, trim: true, minLength: 3 },
  score: [{ type: Number, default: 5 }],
  createdAt: { type: Date, default: Date.now() },
  creator: { type: Types.ObjectId, ref: "User"},
  comments: [{type: Types.ObjectId, ref: "Comment"}]
});

export const PostModel = model("Post", postSchema);