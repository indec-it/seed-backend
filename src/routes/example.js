import {Router} from 'express';

import {ExampleController} from '../controllers/example.js';

const exampleRouter = Router();

exampleRouter.get('/', ExampleController.getAll);
exampleRouter.get('/:id', ExampleController.getById);
exampleRouter.post('/', ExampleController.create);
exampleRouter.put('/:id', ExampleController.update);
exampleRouter.delete('/:id', ExampleController.delete);

export default exampleRouter;
