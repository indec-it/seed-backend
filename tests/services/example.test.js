import {ExampleService} from '../../src/services/example.js';
import {Example} from '../../src/models/example.js';

describe('ExampleService', () => {
  beforeAll(async () => {
    await ExampleService.initializeTable();
  });

  test('should find all examples', async () => {
    await Example.create({ name: 'Example 1', description: 'Desc 1' });
    await Example.create({ name: 'Example 2', description: 'Desc 2' });
    
    const examples = await ExampleService.findAll();
    expect(Array.isArray(examples)).toBe(true);
    expect(examples.length).toBeGreaterThanOrEqual(2);
  });

  test('should find example by id', async () => {
    const created = await Example.create({
      name: 'Find Me',
      description: 'Test'
    });
    
    const found = await ExampleService.findById(created.id);
    expect(found).toBeTruthy();
    expect(found.name).toBe('Find Me');
  });

  test('should create example', async () => {
    const exampleData = {
      name: 'New Example',
      description: 'New Description'
    };
    
    const created = await ExampleService.create(exampleData);
    expect(created.id).toBeDefined();
    expect(created.name).toBe(exampleData.name);
  });

  test('should update example', async () => {
    const example = await Example.create({
      name: 'Original',
      description: 'Original Desc'
    });
    
    const updated = await ExampleService.update(example.id, { name: 'Updated' });
    expect(updated.name).toBe('Updated');
  });

  test('should delete example', async () => {
    const example = await Example.create({
      name: 'Delete Me',
      description: 'Test'
    });
    
    const result = await ExampleService.delete(example.id);
    expect(result).toEqual({ success: true });
    
    const found = await Example.findById(example.id);
    expect(found).toBeNull();
  });
});