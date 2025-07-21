import {Router} from 'express';

import {UserController} from '../../controllers/user.js';

const publicApiRouter = Router();

publicApiRouter.post('/session', UserController.validateSession);
publicApiRouter.post('/login', UserController.login);

export default publicApiRouter;
