import {Example} from '../models/example.js';

export class ExampleService {
  static async findAll() {
    return await Example.find();
  }

  static async findById(id) {
    return await Example.findById(id);
  }

  static async create(data) {
    const example = new Example(data);
    return await example.save();
  }

  static async update(id, data) {
    return await Example.findByIdAndUpdate(id, data, {new: true, runValidators: true});
  }

  static async delete(id) {
    return await Example.findByIdAndDelete(id);
  }
}
