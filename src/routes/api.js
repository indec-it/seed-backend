import {Router} from 'express';

import exampleRoutes from './example.js';

const api = Router();

api.use('/examples', exampleRoutes);

export default api;
