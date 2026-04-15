import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3001,
    MONGOURI: process.env.MONGO_URI || '',
    JWTSECRET: process.env.JWT_SECRET || 'secret_film_app',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '10h'
};