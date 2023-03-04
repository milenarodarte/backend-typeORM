import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import {
  IMovieResponse,
  IMovieUpdateRequest,
} from "../interfaces/movies.interfaces";
import { moviesResponseSchema } from "../schemas/movies.schemas";
import { AppError } from "../errors";

const updateMovieService = async (
  id: number,
  movieData: IMovieUpdateRequest
): Promise<IMovieResponse> => {
  const movieDataKeys = Object.keys(movieData);
  if (movieDataKeys.length === 0) {
    throw new AppError(
      "one of those keys must be sent: [name, description, duration, price]",
      400
    );
  }
  const movieRepository: Repository<Movie> = appDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: id,
  });

  const movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(movie);
  const updatedMovie = moviesResponseSchema.parse(movie);
  return updatedMovie;
};

export default updateMovieService;
