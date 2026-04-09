import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import v1Router from './api/v1/index';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', v1Router);

app.use(errorMiddleware);