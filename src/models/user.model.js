import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    //cartId:{
    //    tyoe: Schema.Types.ObjectId,
    //    ref: "cart",
    //    },
    
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"], // Valores permitidos
        default: "user",
    },
});

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
    const user = this;
    // Solo hashear si la contraseña ha sido modificada
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Exporta el modelo
export const userModel = mongoose.model("User", userSchema);

