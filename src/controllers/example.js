import {ExampleService} from '../services/example.js';

export class ExampleController {
  static async getAll(req, res, next) {
    try {
      const examples = await ExampleService.findAll();
      res.json(examples);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const example = await ExampleService.findById(req.params.id);

      if (!example) {
        return res.status(404).json({message: 'Example not found'});
      }

      res.json(example);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const example = await ExampleService.create(req.body);
      res.status(201).json(example);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const example = await ExampleService.update(req.params.id, req.body);

      if (!example) {
        return res.status(404).json({message: 'Example not found'});
      }

      res.json({message: 'Example updated successfully'});
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const example = await ExampleService.delete(req.params.id);

      if (!example) {
        return res.status(404).json({message: 'Example not found'});
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
