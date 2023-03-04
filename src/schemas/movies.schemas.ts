import { z } from "zod";
const moviesRequestSchema = z.object({
  name: z.string().max(50).min(3),
  description: z.string().optional(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
});
const moviesResponseSchema = moviesRequestSchema.extend({
  description: z.string().nullable(),
  id: z.number(),
});
const multipleMovieRsponseSchema = moviesResponseSchema.array();
const movieUpdateSchema = moviesRequestSchema.partial();

export {
  moviesRequestSchema,
  moviesResponseSchema,
  multipleMovieRsponseSchema,
  movieUpdateSchema,
};
