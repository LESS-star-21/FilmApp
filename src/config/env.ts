import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.port) || 3001,
    mongoUri: process.env.mongo_Uri || '',
    jwtSecret: process.env.jwt_Secret || 'secret_film_app',
    jwtExpiration: process.env.jwt_Expiration || '10h'
};