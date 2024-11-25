import mongoose, { Schema, model, models } from 'mongoose';

// Định nghĩa sub-schema cho Items
const itemSchema = new Schema({
  image: { type: String, required: true }, // Hình ảnh của video
  title: { type: String, required: true }, // Tiêu đề của video
  videoId: { type: String, required: true }, // ID của video
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
  updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật
});

// Định nghĩa schema chính cho TopicVideo
const topicVideoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true }, // Tiêu đề của chủ đề
    background: { type: String, required: true }, // Ảnh nền
    Items: [itemSchema], // Danh sách các video trong chủ đề
    createdAt: { type: Date, default: Date.now }, // Ngày tạo
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật
  },
  {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  }
);

// Export model
const TopicVideo = models.TopicVideo || model('TopicVideo', topicVideoSchema);

export default TopicVideo;
