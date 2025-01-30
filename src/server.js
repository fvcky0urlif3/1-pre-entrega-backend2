import express from "express";
import passport from "passport";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        console.log("connected to the database");
    })
    .catch((error) => {
        console.log("error connecting to the database", error);
    });

app.use("/api/auth", authRouter);
app.use("/api/users", passport.authenticate("jwt", { session: false }), userRouter);

app.listen(4444, () => {
    console.log("server is running on port http://localhost:4444");
});