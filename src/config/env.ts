import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.port) || 3001,
    mongoUri: process.env.mongo_Uri || 'mongodb://datab:111base@ac-6efnrx7-shard-00-00.u3xqmqa.mongodb.net:27017,ac-6efnrx7-shard-00-01.u3xqmqa.mongodb.net:27017,ac-6efnrx7-shard-00-02.u3xqmqa.mongodb.net:27017/?ssl=true&replicaSet=atlas-fnpmdz-shard-0&authSource=admin&appName=Cluster0',
    jwtSecret: process.env.jwt_Secret || 'secret_film_app',
    jwtExpiration: process.env.jwt_Expiration || '10h'
};