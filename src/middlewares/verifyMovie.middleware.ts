import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const verifyMovieMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = appDataSource.getRepository(Movie);

  if (!req.body.name) {
    return next();
  }

  const findMovie = await movieRepository.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (findMovie !== null) {
    throw new AppError("Movie already exists.", 409);
  }
  next();
};
export default verifyMovieMiddleware;
