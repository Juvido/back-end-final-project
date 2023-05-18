import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { PostModel } from "../model/post.model.js";
import { UserModel } from "../model/user.model.js";

const postRouter = express.Router();

postRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const post = await PostModel.create({
      ...req.body,
      creator: req.currentUser._id,
    });

    await UserModel.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $push: { posts: post._id } },
      { runValidators: true, new: true }
    );

    return res.status(201).json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

postRouter.get("/meus-posts", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const userPosts = await PostModel.find({ creator: req.currentUser._id });

    return res.status(200).json(userPosts);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

postRouter.get("/all-posts", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const allPosts = await PostModel.find({});
    return res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findOne({ _id: req.params.id }).populate(
      "comments"
    );

    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

export { postRouter };
