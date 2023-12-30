import express, { Request, Response } from "express";

import Movie from "../models/Movie";

const searchRouter = express.Router();

searchRouter.get("/:q", async (request: Request, response: Response) => {
  try {
    const { q } = request.params;

    if (!q) return response.status(400).json({ error: "no query provided" });

    const movies = await Movie.find({ title: { $regex: q, $options: "i" } })
      .sort({ createdAt: -1 })
      .populate("genres", "title");

    response.json(movies);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});

export default searchRouter;