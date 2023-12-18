import axios from "axios";
import { IMovie, INewMovie } from "../utils/interfaces";
export const getAllMovies = async (): Promise<IMovie[]> => {
  const response = await axios.get("/movies");
  return response.data;
};

export const createMovie = async (arg: any): Promise<IMovie> => {
  const [newMovie, token] = arg;

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.post("/movies", newMovie, config);
  return response.data;
};