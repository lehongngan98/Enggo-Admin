import mongoose, { Schema, model, models } from "mongoose";

// Define the sub-schema for SubTopic
const subTopicSchema = new Schema({
  titleEn: { type: String, required: true, trim: true }, // English title
  titleVn: { type: String, required: true, trim: true }, // Vietnamese title
  text: { type: String, required: true, trim: true }, // Content text
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Define the schema for BilingualTopics
const bilingualTopicsSchema = new Schema({
  topic: { type: String, required: true, trim: true, unique: true }, // Main topic name
  subTopic: [subTopicSchema], // Array of SubTopic documents
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Export the model
const BilingualTopics = models.BilingualTopics || model("BilingualTopics", bilingualTopicsSchema);

export default BilingualTopics;
