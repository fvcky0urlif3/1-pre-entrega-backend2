import { Schema } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age:{
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
        enum: ["admin", "user"],
        default: "user",
    },
});

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre("save", async function(next) {
    const user = this;
    // Solo hashear si la contraseña ha sido modificada
    if (!user.isModified("password")) return next();

    try {
        // Generar un salt y hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export default userSchema;

