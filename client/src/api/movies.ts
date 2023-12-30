import axios from "axios";


import { IMovie } from "../utils/interfaces";


export const getAllMovies = async (
  genre: string | undefined
): Promise<IMovie[]> => {
  const PATH = genre ? `?genre=${genre}` : "";

  const response = await axios.get(`/movies${PATH}`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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