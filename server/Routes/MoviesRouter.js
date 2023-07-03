import express from 'express';

import { admin, protect } from '../middlewares/Auth.js';
import * as moviesController from '../Controllers/MoviesController.js';

const router = express.Router();

// ******** PUBLIC ROUTES *******
router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);




// ******* PROTECTED ROUTES ******


// ************** ADMIN ROUTES **************



export default router;