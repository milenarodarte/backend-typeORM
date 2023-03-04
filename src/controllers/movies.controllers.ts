import { Request, Response } from "express";
import { IMovierequest } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.service";
import deleteMovieService from "../services/deleteMovie.service";
import { listMoviesService } from "../services/listMovies.services";
import updateMovieService from "../services/updateMovie.services";
const createMovieController = async (req: Request, res: Response) => {
  const movieData: IMovierequest = req.body;
  const newData = await createMovieService(movieData);
  return res.status(201).json(newData);
};
const listMoviesController = async (req: Request, res: Response) => {
  const query = req.query;

  const data = await listMoviesService(query);
  return res.status(200).json(data);
};
const deleteMoviesController = async (req: Request, res: Response) => {
  await deleteMovieService(Number(req.params.id));

  return res.status(204).json();
};
const updateMovieController = async (req: Request, res: Response) => {
  const updatedMovie = await updateMovieService(
    Number(req.params.id),
    req.body
  );
  return res.json(updatedMovie);
};
export {
  createMovieController,
  listMoviesController,
  deleteMoviesController,
  updateMovieController,
};
