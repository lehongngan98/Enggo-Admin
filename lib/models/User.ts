import mongoose, { Schema, Document, Model } from "mongoose";

// Define the User interface
interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  photoURL?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User Schema
const UserSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoURL: { type: String, required: false },
    role: { type: String, required: true, default: "user" }, // Default role is 'user'
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Avoid re-compiling model during hot-reloading in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
