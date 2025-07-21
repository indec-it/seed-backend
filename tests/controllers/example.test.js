import {ExampleController} from '../../src/controllers/example.js';
import {ExampleService} from '../../src/services/example.js';

jest.mock('../../src/services/example.js');

describe('ExampleController', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {},
      body: {}
    };

    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };

    next = jest.fn();
  });

  describe('getAll', () => {
    test('should return all examples', async () => {
      const mockExamples = [
        {_id: '1', name: 'Example 1'},
        {_id: '2', name: 'Example 2'}
      ];

      ExampleService.findAll.mockResolvedValue(mockExamples);

      await ExampleController.getAll(req, res, next);

      expect(ExampleService.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockExamples);
      expect(next).not.toHaveBeenCalled();
    });

    test('should handle errors', async () => {
      const error = new Error('Database error');
      ExampleService.findAll.mockRejectedValue(error);

      await ExampleController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    test('should return example by id', async () => {
      const mockExample = {_id: '123', name: 'Example'};
      req.params.id = '123';

      ExampleService.findById.mockResolvedValue(mockExample);

      await ExampleController.getById(req, res, next);

      expect(ExampleService.findById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(mockExample);
    });

    test('should return 404 if example not found', async () => {
      req.params.id = '123';

      ExampleService.findById.mockResolvedValue(null);

      await ExampleController.getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({message: 'Example not found'});
    });

    test('should handle errors', async () => {
      const error = new Error('Database error');
      req.params.id = '123';

      ExampleService.findById.mockRejectedValue(error);

      await ExampleController.getById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    test('should create new example', async () => {
      const newExample = {name: 'New Example', description: 'Test'};
      const createdExample = {_id: '123', ...newExample};
      req.body = newExample;

      ExampleService.create.mockResolvedValue(createdExample);

      await ExampleController.create(req, res, next);

      expect(ExampleService.create).toHaveBeenCalledWith(newExample);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdExample);
    });

    test('should handle errors', async () => {
      const error = new Error('Validation error');
      req.body = {name: 'Test'};

      ExampleService.create.mockRejectedValue(error);

      await ExampleController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    test('should update example', async () => {
      const updateData = {name: 'Updated'};
      const updatedExample = {_id: '123', ...updateData};
      req.params.id = '123';
      req.body = updateData;

      ExampleService.update.mockResolvedValue(updatedExample);

      await ExampleController.update(req, res, next);

      expect(ExampleService.update).toHaveBeenCalledWith('123', updateData);
      expect(res.json).toHaveBeenCalledWith({message: 'Example updated successfully'});
    });

    test('should return 404 if example not found', async () => {
      req.params.id = '123';
      req.body = {name: 'Updated'};

      ExampleService.update.mockResolvedValue(null);

      await ExampleController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({message: 'Example not found'});
    });

    test('should handle errors', async () => {
      const error = new Error('Database error');
      req.params.id = '123';
      req.body = {name: 'Updated'};

      ExampleService.update.mockRejectedValue(error);

      await ExampleController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    test('should delete example', async () => {
      const deletedExample = {_id: '123', name: 'Example'};
      req.params.id = '123';

      ExampleService.delete.mockResolvedValue(deletedExample);

      await ExampleController.delete(req, res, next);

      expect(ExampleService.delete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('should return 404 if example not found', async () => {
      req.params.id = '123';

      ExampleService.delete.mockResolvedValue(null);

      await ExampleController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({message: 'Example not found'});
    });

    test('should handle errors', async () => {
      const error = new Error('Database error');
      req.params.id = '123';

      ExampleService.delete.mockRejectedValue(error);

      await ExampleController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
