import mongoose, { Schema, model, models } from 'mongoose';

const newsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  information: [
    {
      image: { type: String, required: true },
      subTitle: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  typeofnews: [{ type: Schema.Types.ObjectId, ref: 'TypeOfNews' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const News = models.News || model('News', newsSchema);

export default News;
