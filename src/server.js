import express from "express";
import passport from "passport";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
initializePassport();
app.use(passport.initialize());

mongoose
.connect("mongodb://localhost:27017/ecommerce")
.then(()=> {
    console.log("conected to the database");
})
.catch((error) =>{
    console.log("error conecting the database", error);
});

app.use("/api/auth", authRouter);
app.use("/api/users", passport.authenticate("jwt"), userRouter);

app.listen(4444, () =>{
    console.log("server is running on port http://localhost:4444")
});