import express, { Request, Response } from "express";
import Genre from "../models/Genre";
import Movie from "../models/Movie";

const testRouter = express.Router();

testRouter.post("/del", async (request: Request, response: Response) => {
  try {
    const { pass } = request.body;

    if (pass !== "welp") return response.status(400).send("hell naha");

    await Genre.deleteMany({});
    await Movie.deleteMany({});

    response.status(200).json("success");
  } catch (err) {
    response.status(400);
  }
});

export default testRouter;