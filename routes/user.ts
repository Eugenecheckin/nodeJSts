import Router from 'express';

import { update, destroy, getList, create } from '../controllers/user';
import isOwner from '../middleware/Owner';
import isAdmin from '../middleware/Admin';

const userRouter = Router();

userRouter.patch('/update', isOwner, update);
userRouter.delete('/delete', isOwner, destroy);
userRouter.post('/create', isAdmin, create);
userRouter.get('/getList', isAdmin, getList);



module.exports = userRouter;
