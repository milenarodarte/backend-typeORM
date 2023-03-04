import { all } from "axios";
import { Repository } from "typeorm";
import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  IMoviesQuery,
  IMoviesResponsePaginated,
} from "../interfaces/movies.interfaces";
import { multipleMovieRsponseSchema } from "../schemas/movies.schemas";

const listMoviesService = async (
  query: IMoviesQuery
): Promise<IMoviesResponsePaginated> => {
  let page = query.page === null || undefined ? 1 : Number(query.page);
  let perPage = query.perPage === null || undefined ? 5 : Number(query.perPage);

  let sort = query.sort === null || undefined ? "id" : query.sort;
  if (sort === "id" || sort === "price" || sort === "duration") {
  } else {
    sort = "id";
  }

  let order;
  if (sort !== "id") {
    order = query.order === null || undefined ? "asc" : query.order;
    if (order === "asc" || order === "desc") {
    } else {
      order = "asc";
    }
  } else {
    order = "asc";
  }

  if (perPage! > 5 || perPage! < 1 || !Number.isInteger(perPage)) {
    perPage = 5;
  }
  if (page! < 1 || !Number.isInteger(page)) {
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
    skip: perPage * page - perPage,
    order: sortby,
  });
  const movies = multipleMovieRsponseSchema.parse(findMovies);

  const previousPage =
    page === 1
      ? null
      : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;

  const allMoviesLength = allMovies.length;
  let nextPageExists;
  allMoviesLength % perPage === 0
    ? (nextPageExists = allMoviesLength / perPage)
    : (nextPageExists = Math.trunc(allMoviesLength / perPage) + 1);

  let nextPage;
  if (page + 1 > nextPageExists) {
    nextPage = null;
  } else {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  }

  const returnMovies = {
    prevPage: previousPage,
    nextPage: nextPage,
    count: allMoviesLength,
    data: movies,
  };

  return returnMovies;
};
export { listMoviesService };
