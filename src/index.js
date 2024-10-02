// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running in port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection failed!!!", err);
  });

// const app = express();
// (async () => {
//   await mongoose
//     .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     .then((res) => {
//       app.on("error", (error) => {
//         console.log("error", error);
//         throw error;
//       });

//       app.listen(process.env.PORT, () => {
//         console.log(`App is listening on port ${process.env.PORT}`);
//       });
//     })
//     .catch((error) => {
//       console.log("ERROR: ", error);
//       throw error;
//     });
// })();
