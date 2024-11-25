import mongoose, { Schema, model, models } from 'mongoose';

// Sub-schema for Word
const wordSchema = new Schema({
  word: { type: String, required: true, trim: true }, // Word text
  pronunciation: { type: String, required: true, trim: true }, // Pronunciation of the word
  meaning: { type: String, required: true, trim: true }, // Meaning of the word
  type: { type: String, required: true, trim: true }, // Type of the word (e.g., noun, verb, adjective, etc.)
  createdAt: { type: Date, default: Date.now }, // Date when the word was added
  updatedAt: { type: Date, default: Date.now }, // Date when the word was last updated
});

// Schema for Quote
const quoteSchema = new Schema(
  {
    author: { type: String, required: true, trim: true }, // Author of the quote
    text: { type: String, required: true, trim: true }, // Text of the quote
    words: [wordSchema], // List of words related to the quote
    createdAt: { type: Date, default: Date.now }, // Date when the quote was created
    updatedAt: { type: Date, default: Date.now }, // Date when the quote was last updated
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Export the model
const Quote = models.Quote || model('Quote', quoteSchema);

export default Quote;
