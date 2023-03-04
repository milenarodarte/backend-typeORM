import { all } from "axios";
import { Repository } from "typeorm";
import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  IMoviesQuery,
  IMoviesResponsePaginated,
  MoviesSort,
} from "../interfaces/movies.interfaces";
import { multipleMovieRsponseSchema } from "../schemas/movies.schemas";

const listMoviesService = async ({
  order = 'asc',
  page = 1,
  perPage = 5,
  sort = MoviesSort.ID,
}: IMoviesQuery): Promise<IMoviesResponsePaginated> => {
  if (sort === MoviesSort.ID) {
    order = 'asc';
  }

  if (Number(perPage) > 5 || Number(perPage) < 1 || !Number.isInteger(perPage)) {
    perPage = 5;
  }
  if (Number(page) < 1 || !Number.isInteger(page)) {
    page = 1;
  }

  const moviesRepository: Repository<Movie> =
    appDataSource.getRepository(Movie);

  const findAllMovies = await moviesRepository.find();
  const allMovies = multipleMovieRsponseSchema.parse(findAllMovies);

  const sortby: any = {};
  sortby[`${sort}`] = `${order}`;

  const findMovies = await moviesRepository.find({
    take: perPage,
    skip: Number(perPage) * Number(page) - Number(perPage),
    order: sortby,
  });
  const movies = multipleMovieRsponseSchema.parse(findMovies);

  const previousPage =
    page === 1
      ? null
      : `http://localhost:3000/movies?page=${Number(page) - 1}&perPage=${perPage}`;

  const allMoviesLength = allMovies.length;
  let nextPageExists;
  allMoviesLength % Number(perPage) === 0
    ? (nextPageExists = allMoviesLength / Number(perPage))
    : (nextPageExists = Math.trunc(allMoviesLength / Number(perPage)) + 1);

  let nextPage;
  if (Number(page) + 1 > nextPageExists) {
    nextPage = null;
  } else {
    nextPage = `http://localhost:3000/movies?page=${
      Number(page) + 1
    }&perPage=${perPage}`;
  }

  return {
    prevPage: previousPage,
    nextPage: nextPage,
    count: allMoviesLength,
    data: movies,
  };
};
export { listMoviesService };
