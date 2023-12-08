import express from "express";
import parser from "body-parser";
import cors from "cors";
import controllers from "./Controller.js"
import { config } from "dotenv";

config()
const app = express();
app.use(cors({optionsSuccessStatus:200}))
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("hello")
})
app.post("/signup",  controllers.signupController);
app.post( "/login", controllers.loginController);

const port =   process.env.PORT || 5050; 

app.listen(port, (err)=>{
    if(!err){
        console.log("Server is running."+process.env.PORT)
    }else{
        console.log("Some Error Occured")
    }
})
