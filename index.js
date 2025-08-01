import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import {connectDB} from './src/helpers/database.js';
import apiRoutes from './src/routes/api.js';
import publicApiRoutes from './src/routes/public-api/index.js';
import swaggerDocument from './src/docs/swagger.js';
import {requestLogger} from './src/routes/middlewares/logger.js';
import authenticate from './src/routes/middlewares/authenticate.js';

process.loadEnvFile();

export const app = express();
const port = process.env.PORT || 8081;

app.disable('x-powered-by');

app.use(cors({
  origin: ['http://localhost:6011', 'http://localhost:6091'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', authenticate, apiRoutes);
app.use('/public-api', publicApiRoutes);
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

const startServer = async () => {
  try {
    //await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
