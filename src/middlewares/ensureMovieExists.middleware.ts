import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureMovieExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = appDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (findMovie === null) {
    throw new AppError("Movie not found", 404);
  }
  next();
};
export default ensureMovieExistsMiddleware;
