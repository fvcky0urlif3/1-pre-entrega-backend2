import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

// 📌 Registro
authRouter.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
    if (!req.user) return res.status(400).json({ message: "❌ Registro fallido" });

    const { user, token } = req.user;

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 semana
    });

    res.json({ message: "✅ Registro exitoso", user });
});

// 📌 Login
authRouter.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
    if (!req.user) return res.status(401).json({ message: "❌ Login fallido" });

    const { user, token } = req.user;

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    res.json({ message: "✅ Login exitoso", token });
});