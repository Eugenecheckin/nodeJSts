import express from 'express';
import bodyParser from 'body-parser';

import authRoute from './routes/auth';
import userRoute from './routes/user';

export const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use('/Auth', authRoute);
app.use('/User', userRoute);

