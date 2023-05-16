import { Schema, model, Types} from "mongoose";

const commentSchema = new Schema ({
    text: { type: String, required: true, trim: true},
    creator: { type: Types.ObjectId, ref: "User"},
    referencePost: {type:Types.ObjectId, ref: "Post" }
})

export const CommentModel = model("Comment", commentSchema)