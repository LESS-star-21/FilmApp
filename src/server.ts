import { app } from './app';
import { env } from './config/env';
import { connectDB } from './config/database';

const bootstrap = async () => {
    await connectDB();
    app.listen(env.PORT, () => {
        console.log(`Servidor corriendo en puerto http://localhost:${env.PORT}`);
    });
};

bootstrap();