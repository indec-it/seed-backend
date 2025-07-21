import {Example} from '../../src/models/example.js';

// Note: These tests require a real Oracle database connection
// Set up test environment variables before running tests

describe('Example Model', () => {
  beforeAll(async () => {
    await Example.createTable();
  });

  beforeEach(async () => {
    await Example.deleteAll?.() || true; // Optional cleanup if method exists
  });

  test('should create a new example', async () => {
    const exampleData = {
      name: 'Test Example',
      description: 'Test Description'
    };
    
    const example = await Example.create(exampleData);
    
    expect(example.id).toBeDefined();
    expect(example.name).toBe(exampleData.name);
    expect(example.description).toBe(exampleData.description);
    expect(example.created_at).toBeDefined();
    expect(example.updated_at).toBeDefined();
  });

  test('should find example by id', async () => {
    const created = await Example.create({
      name: 'Find Me',
      description: 'Test'
    });
    
    const found = await Example.findById(created.id);
    expect(found).toBeTruthy();
    expect(found.name).toBe('Find Me');
  });

  test('should return null for non-existent id', async () => {
    const found = await Example.findById(99999);
    expect(found).toBeNull();
  });

  test('should update example', async () => {
    const example = await Example.create({
      name: 'Original',
      description: 'Original Desc'
    });
    
    const updated = await Example.update(example.id, { name: 'Updated' });
    expect(updated.name).toBe('Updated');
  });

  test('should delete example', async () => {
    const example = await Example.create({
      name: 'Delete Me',
      description: 'Test'
    });
    
    const deleted = await Example.delete(example.id);
    expect(deleted).toBe(true);
    
    const found = await Example.findById(example.id);
    expect(found).toBeNull();
  });

  test('should find all examples', async () => {
    await Example.create({ name: 'Example 1', description: 'Desc 1' });
    await Example.create({ name: 'Example 2', description: 'Desc 2' });
    
    const examples = await Example.findAll();
    expect(examples.length).toBeGreaterThanOrEqual(2);
  });
});