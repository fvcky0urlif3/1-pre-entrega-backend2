import passport, { initialize } from "passport";
import { Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";
import {Strategy as LocalStrategy } from "passport-local";
import {SECRET} from "../utils/jwt.utils.js";
import {userModel } from "../models/user.model.js";
import { comparepassword } from "./utils/password.utils.js";
import { createToken } from "./utils/jwt.utils.js";


export function initializePassport() {

    passport.use ("register", new LocalStrategy({
        passReqToCallBack: true,
        usernameField: "email"
}, async(req, email, password, done)=> {
    try {
        const {firstName, lastName, age, role} = req.body;
        if (!firstName || !lastName || !age || !role){
            return done(null, false, {message: "Missing fields"});
        }
        const user = await userModel.create({
            first_name: firstName,
            last_name: lastName,
            email,
            age,
            password,
            role,
    });

    return done(null, user);
    } catch (error) {
        return done(error)
    }
   } 
  )
 );
 
 passport.use("login", new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true,
 }, 
 
 async ( email, password, done) => {
    try {
        const user = await userModel.findOne([ email ]);
    if (!user) return done(null, false, {message: "user not found" });

    const isValidPassword = await comparepassword(password, user.password);

    if(!isValidPassword) return done(null, false, { message: "invalid password" });

    const token = createToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    req.token = token;
    
    return done(null,user);
    } catch (error) {
        return done(error);
       }
 }));
    
    passport.use("jwt", new  JWTStrategy(
        {
            secretOrKey: SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        }, async (payload, done) => {
            try {
                const user = await userModel.findById(payload.id);

                if (!user) return done (null, false);

                return done(null, user);
            } catch(error) {
                return done(error);
            }
        }
    )
);

    passport.serializeUser((user, done)=> {
        done (null, user.id);
    });

    passport.deserializeUser ( async (id, done)=>{
        const user = await userModel.findById(id);

        if (!user) return done(null, false);
        
        return done(null, user);
        });
    }

    function cookieExtractor(req) {
        let token = null;

        if (req && req.cookies) {
            token = req.cookies.token;
        }
        return token;
    }