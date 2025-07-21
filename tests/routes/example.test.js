import request from 'supertest';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

import {app} from '../../index.js';
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

describe('Example Routes', () => {
  test('GET /api/examples should return all examples', async () => {
    await Example.create([
      {name: 'Example 1', description: 'Desc 1'},
      {name: 'Example 2', description: 'Desc 2'}
    ]);

    const response = await request(app).get('/api/examples').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
  });

  test('POST /api/examples should create a new example', async () => {
    const newExample = {
      name: 'New Example',
      description: 'New Description'
    };

    const response = await request(app).post('/api/examples').send(newExample).expect(201);

    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBe(newExample.name);
    expect(response.body.description).toBe(newExample.description);
  });

  test('GET /api/examples/:id should return specific example', async () => {
    const example = await Example.create({
      name: 'Test',
      description: 'Test'
    });

    const response = await request(app).get(`/api/examples/${example._id}`).expect(200);

    expect(response.body.name).toBe('Test');
  });

  test('PUT /api/examples/:id should update example', async () => {
    const example = await Example.create({
      name: 'Original',
      description: 'Original'
    });

    const response = await request(app).put(`/api/examples/${example._id}`).send({name: 'Updated'}).expect(200);

    expect(response.body.message).toBe('Example updated successfully');
  });

  test('DELETE /api/examples/:id should delete example', async () => {
    const example = await Example.create({
      name: 'Delete Me',
      description: 'Test'
    });

    await request(app).delete(`/api/examples/${example._id}`).expect(204);

    const found = await Example.findById(example._id);
    expect(found).toBeNull();
  });

  test('should return 404 for non-existent example', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    await request(app).get(`/api/examples/${fakeId}`).expect(404);
  });
});
