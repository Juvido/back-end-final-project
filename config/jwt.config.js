import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

export function generateToken(user) {
  const { _id, name, email, role } = user;

  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiresTime = "12h";

  return jwt.sign(
    { _id, name, email, role }, 
    signature, 
    { expiresIn: expiresTime}
  );
}

