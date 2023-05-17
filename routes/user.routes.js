import bcrypt from "bcrypt";
import express from "express";
import { generateToken } from "../config/jwt.config.js";
import { UserModel } from "../model/user.model.js";

const SALT_ROUNDS = 10;

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "Email ou senha inválidos. Verifique se atendem as condições.",
      });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    delete user._doc.passwordHash;
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Email ou senha inválidos. Verifique e tente novamente" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        token: token,
      });
    } else {
      return res.status(404).json({ msg: "Email ou senha inválidos. Verifique e tente novamente" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

export { userRouter };