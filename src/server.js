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
    .then(() => console.log("✅ Conectado a la base de datos"))
    .catch((error) => console.log("❌ Error en la conexión a la base de datos:", error));

app.use("/api/auth", authRouter);
app.use("/api/users", passport.authenticate("jwt", { session: false }), userRouter);

app.listen(4444, () => {
    console.log("🚀 Servidor corriendo en http://localhost:4444");
});