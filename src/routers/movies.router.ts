import { Router } from "express";
import {
  createMovieController,
  listMoviesController,
  deleteMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureMovieExistsMiddleware from "../middlewares/ensureMovieExists.middleware";
import verifyMovieMiddleware from "../middlewares/verifyMovie.middleware";
import {
  moviesRequestSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";
const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValidMiddleware(moviesRequestSchema),
  verifyMovieMiddleware,
  createMovieController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.delete(
  "/:id",
  ensureMovieExistsMiddleware,
  deleteMoviesController
);
moviesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(movieUpdateSchema),
  verifyMovieMiddleware,
  ensureMovieExistsMiddleware,
  updateMovieController
);

export default moviesRoutes;
