import express from 'express';
import bodyParser from 'body-parser';

import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use('/Auth', authRouter);
app.use('/User', userRouter);

export default app