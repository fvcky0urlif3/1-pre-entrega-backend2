import bcrypt from "bcrypt"

export async function comparepassword(password){
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

export async function comparepassword(password, hashedpassword) {
    return await bcrypt.compare(password, hashedpassword);
}
