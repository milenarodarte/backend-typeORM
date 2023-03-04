import { IMovierequest, IMovieResponse } from "../interfaces/movies.interfaces";
import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { moviesResponseSchema } from "../schemas/movies.schemas";
const createMovieService = async (
  movieData: IMovierequest
): Promise<IMovieResponse> => {
  const moviesRepository: Repository<Movie> =
    appDataSource.getRepository(Movie);

  const movie = moviesRepository.create(movieData);

  await moviesRepository.save(movie);

  const newMovie = moviesResponseSchema.parse(movie);

  return newMovie;
};
export default createMovieService;
