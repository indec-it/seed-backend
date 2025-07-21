import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

import {Example} from '../../src/models/example.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Example.deleteMany({});
});

describe('Example Model', () => {
  test('should create a new example', async () => {
    const exampleData = {
      name: 'Test Example',
      description: 'Test Description'
    };

    const example = new Example(exampleData);
    const saved = await example.save();

    expect(saved._id).toBeDefined();
    expect(saved.name).toBe(exampleData.name);
    expect(saved.description).toBe(exampleData.description);
    expect(saved.createdAt).toBeDefined();
    expect(saved.updatedAt).toBeDefined();
  });

  test('should require name field', async () => {
    const example = new Example({
      description: 'Test Description'
    });

    let error;
    try {
      await example.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  test('should find all examples', async () => {
    await Example.create([
      {name: 'Example 1', description: 'Desc 1'},
      {name: 'Example 2', description: 'Desc 2'}
    ]);

    const examples = await Example.find();
    expect(examples).toHaveLength(2);
  });

  test('should find example by id', async () => {
    const created = await Example.create({
      name: 'Find Me',
      description: 'Test'
    });

    const found = await Example.findById(created._id);
    expect(found).toBeTruthy();
    expect(found.name).toBe('Find Me');
  });

  test('should update example', async () => {
    const example = await Example.create({
      name: 'Original',
      description: 'Original Desc'
    });

    const updated = await Example.findByIdAndUpdate(example._id, {name: 'Updated'}, {new: true});

    expect(updated.name).toBe('Updated');
  });

  test('should delete example', async () => {
    const example = await Example.create({
      name: 'Delete Me',
      description: 'Test'
    });

    await Example.findByIdAndDelete(example._id);

    const found = await Example.findById(example._id);
    expect(found).toBeNull();
  });
});
