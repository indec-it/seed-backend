import {Example} from '../models/example.js';

export class ExampleService {
  static async findAll() {
    return await Example.findAll();
  }

  static async findById(id) {
    return await Example.findById(id);
  }

  static async create(data) {
    return await Example.create(data);
  }

  static async update(id, data) {
    return await Example.update(id, data);
  }

  static async delete(id) {
    const deleted = await Example.delete(id);
    return deleted ? { success: true } : null;
  }

  // Initialize database table (useful for setup)
  static async initializeTable() {
    await Example.createTable();
  }
}