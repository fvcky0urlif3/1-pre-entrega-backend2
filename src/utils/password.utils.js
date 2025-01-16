import bcrypt from "bcrypt";

// Función para hashear una contraseña
export async function hashPassword(password) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

// Función para comparar una contraseña con su hash
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}