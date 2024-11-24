import mongoose, { Schema, model, models, Document } from 'mongoose';

// Define a sub-schema for words
const wordSchema = new Schema({
  word: { type: String, required: true }, // Word is required
  meaning: { type: String, required: true }, // Meaning is required
});

// Define the main story schema
const storySchema = new Schema(
  {
    nameVn: { type: String, required: true, trim: true }, // Required and trimmed
    nameEn: { type: String, required: true, trim: true, unique: true }, // Unique for English name
    image: { type: String, required: true }, // Image is required
    content: { type: String, required: true, maxlength: 500 }, // Max length for content
    words: [wordSchema], // Embedded word schema
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

// Export the model
const Story = models.Story || model('Story', storySchema);

export default Story;
