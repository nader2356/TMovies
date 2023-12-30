import axios from "axios";
import { IMovie } from "../utils/interfaces";

export const searchMovies = async (q: string): Promise<IMovie[]> => {
  const response = await axios.get(`search/${q}`);
  return response.data;
};