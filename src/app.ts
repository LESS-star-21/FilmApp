import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import v1Router from './api/v1/index';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import {openApiSpec} from './config/openapi';

export const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de películas y series');
});

app.use('/api/v1', v1Router);

app.use(errorMiddleware);