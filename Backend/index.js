import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from './Routes/Todo.js'
import projectRoute from './Routes/project.js'
import userRoute from './Routes/Usre.js'
import gistRoute from './Routes/Gist.js'
import cors from "cors"
dotenv.config();

const corsOptions = {
    origin: true,
  };
  

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/todo", todoRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/gits", gistRoute);
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port " + PORT);
  });


mongoose.set("strictQuery", false);
const connectDB = async () => {
      try {
          await mongoose.connect(process.env.MONGO_URL, {});
          console.log("CONNECTED TO DATABASE SUCCESSFULLY");
      } catch (error) {
          console.error('COULD NOT CONNECT TO DATABASE:', error.message);
      }
  };  