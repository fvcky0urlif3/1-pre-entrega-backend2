    import { Router } from "express";
    import passport from "passport";


    export const authRouter = Router();

    authRouter.post("/register", passport.authenticate("register"), (req, res)=>{
        res.json(req.user);
    });

    authRouter.post("/login", passport.authenticate("login"), (req, res) => {
        const token = req.token;

        res.json({ token });
    });
