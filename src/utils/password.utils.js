import bcrypt from "bcrypt";

// Función para hashear una contraseña
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10); // Generar el salt correctamente
    return await bcrypt.hash(password, salt);
}

// Función para comparar una contraseña con su hash
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}