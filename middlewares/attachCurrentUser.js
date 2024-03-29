import { UserModel } from "../model/user.model.js";

export default async function attachCurrentUser(req, res, next) {
  try {
    const userData = req.auth;

    const user = await UserModel.findOne(
      { _id: userData._id },
      { passwordHash: 0 } 
    );
    
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado!" });
    }

    req.currentUser = user;

    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
}

