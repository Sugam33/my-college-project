import asyncHandler from "express-async-handler";
import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js"

// ********* PUBLIC CONTROLLERS **********
// import movies,   route - POST /api/movies/import
const importMovies = asyncHandler(async(req, res) => {
    await Movie.deleteMany({});
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

export { importMovies };