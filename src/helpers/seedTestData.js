import {Example} from '../models/example.js';

export const seedTestData = async () => {
  await Example.deleteMany({});

  await Example.create([
    {
      name: 'Example 1',
      description: 'This is the first example'
    },
    {
      name: 'Example 2',
      description: 'This is the second example'
    },
    {
      name: 'Example 3',
      description: 'This is the third example'
    }
  ]);
};

export const clearTestData = async () => {
  await Example.deleteMany({});
};
