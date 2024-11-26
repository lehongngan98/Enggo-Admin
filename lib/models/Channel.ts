import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for Channel
const channelSchema = new Schema({
  title: { type: String, required: true, trim: true }, // Title of the channel
  description: { type: String, required: true, trim: true }, // Description of the channel
  channelId: { type: String, required: true, unique: true, trim: true }, // Unique ID for the channel
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
const Channel = models.Channel || model("Channel", channelSchema);

export default Channel;
