import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/Routes/userRoutes.js";
import postRoutes from "./src/Routes/postRoutes.js";
import { uploadImage } from "./src/middlewares/imageUpload.js";
import CommentPipes from "./src/Routes/commentRoutes.js";
import RepRouter from "./src/Routes/replyRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/api",userRouter);
app.use("/",uploadImage);
app.use("/api", postRoutes);
app.use("/api",CommentPipes);
app.use("/api",RepRouter);
app.listen(port, () => {
  console.log(`app is lestening on server${port}`);
});



mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log("connecting to database has failed", error);
  });
