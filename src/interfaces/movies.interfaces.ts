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
interface IMoviesQuery {
  page?: string;
  perPage?: string;
  sort?: string;
  order?: string;
}
export {
  IMovieResponse,
  IMovierequest,
  IMultipleMoviesResponse,
  IMovieUpdateRequest,
  IMoviesResponsePaginated,
  IMoviesQuery,
};
