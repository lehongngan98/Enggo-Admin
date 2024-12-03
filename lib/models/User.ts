import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for BilingualTopics
const UserSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  photoURL: String,
  role: String,
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Export the model
const User = models.User || model("Users", UserSchema);

export default User;
