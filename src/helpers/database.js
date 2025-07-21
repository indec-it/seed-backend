import mongoose from 'mongoose';
import {styleText} from 'node:util';
import {MongoMemoryServer} from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async (uri = process.env.MONGO_URI) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    await mongoose.connect(uri);
    console.log(styleText('green', 'Connected to MongoDB...'));
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
