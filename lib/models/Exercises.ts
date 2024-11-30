import mongoose, { Schema, Document } from "mongoose";

// Define the Exercise interface
interface Exercise extends Document {
  title: string;
  background?: string;
  Items?: {
    title: string;
    link: string;
    image: string;
    content: { text: string }[];
    choosePhrase: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Exercise Schema
const ExerciseSchema = new Schema<Exercise>(
  {
    title: { type: String, required: true },
    background: { type: String, required: false },
    Items: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
        image: { type: String, required: true },
        content: [
          {
            text: { type: String, required: true },
          },
        ],
        choosePhrase: [
          {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
          },
        ],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  }
);

// Avoid re-compiling model during hot-reloading in development
const Exercise =
  mongoose.models.Exercise ||
  mongoose.model<Exercise>("Exercise", ExerciseSchema);

export default Exercise;
