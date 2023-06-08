import express from 'express';
import { registerUser } from '../Controllers/UserController';

const router = express.Router();

router.post("/", registerUser);

export default router;