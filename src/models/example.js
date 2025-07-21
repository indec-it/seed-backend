import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Example = mongoose.model('Example', exampleSchema);
