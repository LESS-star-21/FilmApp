import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.port) || 3001,
    mongoUri: process.env.mongo_Uri || '',
    jwtSecret: process.env.jwtSecret || 'secret_film_app',
    jwtExpiration: process.env.jwtExpiration || '10h'
};