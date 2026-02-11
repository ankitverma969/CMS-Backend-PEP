import dotenv from "dotenv";

import app from "./app.js"
import connectDB from "./config/db.js";


dotenv.config()
connectDB()

const PORT = process.env.PORT; 

app.listen(PORT,(err,data)=>{
    if(err){
        console.log("Error starting server:", err);
    } else {
        console.log(`Listening on PORT ${PORT}`);
    }
})