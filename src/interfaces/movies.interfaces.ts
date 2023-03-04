import {
  moviesRequestSchema,
  moviesResponseSchema,
  multipleMovieRsponseSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type IMovierequest = z.infer<typeof moviesRequestSchema>;
type IMovieResponse = z.infer<typeof moviesResponseSchema>;
type IMultipleMoviesResponse = z.infer<typeof multipleMovieRsponseSchema>;
type IMovieUpdateRequest = DeepPartial<IMovierequest>;
interface IMoviesResponsePaginated {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IMultipleMoviesResponse;
}

enum MoviesSort {
  ID = 'id',
  PRICE = 'price',
  DURATION = 'duration'
}
interface IMoviesQuery {
  page?: string | Number;
  perPage?: string | Number;
  sort?: MoviesSort;
  order?: string;
}

export {
  IMovieResponse,
  IMovierequest,
  IMultipleMoviesResponse,
  IMovieUpdateRequest,
  IMoviesResponsePaginated,
  IMoviesQuery,
  MoviesSort
};
