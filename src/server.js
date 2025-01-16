import express from "express"
import cookieParser from "cookie-parser"

const app = express();

//express config
app.use(cookieParser());

//routes
//set cookie
app.get("/set-cookie", (req, res)=>{
res.cookie("pepecookie", "esta es la pp cookie")
res.send();
});

//app listen
app.listen(4400, ()=>{
    console.log('server running on port http://localhost:4400')
});

