import jwt from "jsonwebtoken";

export const SECRET = "mysecret"; // 🔹 Asegurate de usar el mismo en toda la app

export function createToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "10m" });
}

export function verifyToken(token) {
    try {
        if (!token) throw new Error("Token missing");
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null; // Devuelve null si el token es inválido
    }
}