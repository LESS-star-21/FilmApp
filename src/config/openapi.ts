import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';

const options: swaggerJSDoc.Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api movies and series',
      version: '1.0.0',
      description: 'Documentation of the endpoints of the api movies and series',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Documentation of the endpoints of the api movies and series',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [        // ← agrega esto
      {
        bearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, '../modules/**/*.routes.{ts,js}')],
};

export const openApiSpec = swaggerJSDoc(options);
