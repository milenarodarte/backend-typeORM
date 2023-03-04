import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";

const deleteMovieService = async (id: number): Promise<void> => {
  const movieRepository: Repository<Movie> = appDataSource.getRepository(Movie);

  const movie = await movieRepository.findOne({
    where: {
      id: id,
    },
  });
  await movieRepository.remove(movie!);
};
export default deleteMovieService;
