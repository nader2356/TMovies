require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import movieRouter from "./controllers/movie";
import genreRouter from "./controllers/genre";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import searchRouter from "./controllers/search";


import { unknownEndpoint } from "./utils/middleware";
import testRouter from "./controllers/test";

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
mongoose
  .connect(MONGODB_URI!)
  .then(() => console.log(`connected to ${MONGODB_URI}`))
  .catch(() => console.log(`failed to connect ${MONGODB_URI}`));
app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use("/api/movies", movieRouter);
app.use("/api/genres", genreRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/search", searchRouter);

app.use("/api/test", testRouter);

app.use("*", unknownEndpoint);
export default app;