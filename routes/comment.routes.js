import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { PostModel } from "../model/post.model.js";
import { UserModel } from "../model/user.model.js";
import { CommentModel } from "../model/comment.model.js";

const commentRouter = express.Router();

commentRouter.post("/:postId", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;
    const comment = await CommentModel.create({
      ...req.body,
      creator: loggedInUser._id,
      referencePost: req.params.postId,
    });
    await PostModel.findOneAndUpdate(
      { _id: req.params.postId },
      { $push: { comments: comment._id } },
      { runValidators: true}
    );
    await UserModel.findOneAndUpdate(
        { _id: loggedInUser.postId },
        { $push: { comments: comment._id } },
        { runValidators: true}
      );
      return res.status(200).json(comment)
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

export { commentRouter };
