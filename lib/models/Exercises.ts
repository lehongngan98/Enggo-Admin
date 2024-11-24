import mongoose, { Schema, Document, model, models } from 'mongoose';

// Define interfaces
export interface Content {
  text: string;
  _id: string;
}

export interface ChoosePhrase {
  question: string;
  options: string[];
  correctAnswer: string;
  _id: string;
}

export interface Item {
  title: string;
  link: string;
  image: string;
  content: Content[];
  choosePhrase: ChoosePhrase[];
  _id: string;
}

export interface IExercise extends Document {
  title: string;
  background: string;
  Items: Item[];
  createdAt: Date;
  updatedAt: Date;
}

// Define schema
const contentSchema = new Schema<Content>({
  text: { type: String, required: true },
});

const choosePhraseSchema = new Schema<ChoosePhrase>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },

});

const itemSchema = new Schema<Item>({
  title: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: [contentSchema], required: true },
  choosePhrase: { type: [choosePhraseSchema], required: true },

});

const exercisesSchema = new Schema<IExercise>(
  {
    title: { type: String, required: true, unique: true },
    background: { type: String, required: true },
    Items: { type: [itemSchema], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Export model
const Exercises = models.Exercises || model<IExercise>('Exercises', exercisesSchema);

export default Exercises;
