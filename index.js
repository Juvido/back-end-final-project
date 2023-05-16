import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./config/db.config.js";
import { uploadImgRouter } from "./routes/uploadImage.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { commentRouter } from "./routes/comment.routes.js"

dotenv.config();
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/uploadImage", uploadImgRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter)

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
