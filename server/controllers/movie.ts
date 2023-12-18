import express, { Request, Response } from "express";
import Movie from "../models/Movie";
const movieRouter = express.Router();

movieRouter.get("/", async (request: Request, response: Response) => {
  try {
    const movies = await Movie.find({}).populate("genres", "title");
    const movies = await Movie.find({}).sort({createdAt: -1}).populate("genres", "title");

    if (movies.length === 0) return response.json({ error: "no movies found" });

    response.json(movies);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
movieRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    console.log(id);
    const movie = await Movie.findById(id).populate("genres", "title");
    response.json(movie);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
movieRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { title, poster, genres } = request.body;
    console.log(genres);
    if (!title || !poster)
      return response
        .status(400)
        .json({ error: "title and/or poster are missing" });
    const movie = new Movie({
      title,
      poster,
      genres: genres?.length > 0 ? genres : [],
    });
    const newMovie = await movie.save();
    response.json(newMovie);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
movieRouter.put("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { title, poster } = request.body;
    if (!title && !poster)
      return response
        .status(400)
        .json({ error: "should add at least one to modifie" });
    const movie = await Movie.findById(id);
    if (!movie) return response.status(400).json({ error: "movie not found" });
    const newMovie = await Movie.findByIdAndUpdate(
      id,
      { title, poster },
      { new: true }
    );
    response.json(newMovie);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
movieRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    response.json(deletedMovie);
  } catch (err: any) {
    response.status(400).json({ error: err.message });
  }
});
export default movieRouter;