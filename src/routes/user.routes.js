import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/user.model.js";

export const userRouter = Router();

// ✅ Protegemos la ruta con JWT correctamente
userRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const users = await userModel.find();
    res.json(users);
});