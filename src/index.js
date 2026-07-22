import dotenv from "dotenv";
import connectDB from "./db/database.js";
dotenv.config({
    path: "./.env"
})




connectDB();

































// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: process.env.DB_NAME
// });

// IIFE (Immediately Invoked Function Expression) to connect to the database

/*

import express from "express";
const app = express();

( async() =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (err) =>{
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("Error connecting to the database:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
})()
    */