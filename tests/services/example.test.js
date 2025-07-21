import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

import {ExampleService} from '../../src/services/example.js';
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

describe('ExampleService', () => {
  test('should find all examples', async () => {
    await Example.create([
      {name: 'Example 1', description: 'Desc 1'},
      {name: 'Example 2', description: 'Desc 2'}
    ]);

    const examples = await ExampleService.findAll();
    expect(examples).toHaveLength(2);
  });

  test('should find example by id', async () => {
    const created = await Example.create({
      name: 'Find Me',
      description: 'Test'
    });

    const found = await ExampleService.findById(created._id);
    expect(found).toBeTruthy();
    expect(found.name).toBe('Find Me');
  });

  test('should create example', async () => {
    const exampleData = {
      name: 'New Example',
      description: 'New Description'
    };

    const created = await ExampleService.create(exampleData);
    expect(created._id).toBeDefined();
    expect(created.name).toBe(exampleData.name);
  });

  test('should update example', async () => {
    const example = await Example.create({
      name: 'Original',
      description: 'Original Desc'
    });

    const updated = await ExampleService.update(example._id, {name: 'Updated'});
    expect(updated.name).toBe('Updated');
  });

  test('should delete example', async () => {
    const example = await Example.create({
      name: 'Delete Me',
      description: 'Test'
    });

    const deleted = await ExampleService.delete(example._id);
    expect(deleted._id.toString()).toBe(example._id.toString());

    const found = await Example.findById(example._id);
    expect(found).toBeNull();
  });
});
