import express from 'express';

import { admin, protect } from '../middlewares/Auth.js';
import { getMovies, importMovies } from '../Controllers/MoviesController.js';

const router = express.Router();

// ******** PUBLIC ROUTES *******
router.post("/import", importMovies);
router.get("/", getMovies);



// ******* PROTECTED ROUTES ******


// ************** ADMIN ROUTES **************



export default router;