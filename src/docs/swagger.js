import examples from './api/examples.js';
import publicApi from './api/public-api.js';

export default {
  openapi: '3.1.1',
  info: {
    title: 'Express MongoDB Seed API',
    description: 'RESTful API built with Express.js and MongoDB',
    version: '1.0.0'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format: Bearer <token>'
      }
    }
  },
  tags: [
    {
      name: 'Examples',
      description: 'Example CRUD operations (protected endpoints)'
    },
    {
      name: 'Authentication',
      description: 'User authentication endpoints (public)'
    }
  ],
  paths: {
    ...examples,
    ...publicApi
  }
};
