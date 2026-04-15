import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 3001,
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || 'secret_film_app',
    jwtExpiration: process.env.JWT_EXPIRATION || '10h'
};