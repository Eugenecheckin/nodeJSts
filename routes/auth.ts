import Router from 'express';

import { sinUp, login } from '../controllers/auth';
import isOwner from '../middleware/Owner';

export const authRouter = Router();

authRouter.post('/signup', sinUp);
authRouter.get('/login', isOwner, login);

