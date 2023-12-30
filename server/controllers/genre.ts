import express, { Request, Response } from "express";
import Genre from "../models/Genre";
const genreRouter = express.Router();

genreRouter.get("/", async (request: Request, response: Response) => {
  try {
    
    const genres = await Genre.find({});

    if (genres.length === 0)
      return response.status(400).json({ error: "no genres found" });
    response.json(genres);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
genreRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const genre = await Genre.findById(id).populate("movies");
    response.json(genre);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
genreRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { title } = request.body;
    if (!title) return response.status(400).json({ error: "title is missing" });
    const genre = new Genre({ title });
    const newGenre = await genre.save();
    response.json(newGenre);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
genreRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedGenre = await Genre.findByIdAndDelete(id);
    response.json(deletedGenre);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
export default genreRouter;