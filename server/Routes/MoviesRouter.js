import express from 'express';

import { admin, protect } from '../middlewares/Auth.js';
import { importMovies } from '../Controllers/MoviesController.js';

const router = express.Router();

// ******** PUBLIC ROUTES *******
router.post("/import", importMovies);


// ******* PROTECTED ROUTES ******


// ************** ADMIN ROUTES **************



export default router;