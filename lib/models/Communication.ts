import mongoose, { Schema, model, models } from 'mongoose';

// Định nghĩa sub-schema cho từ vựng (Vocab)
const vocabSchema = new Schema({
  en: { type: String, required: true, trim: true }, // Từ tiếng Anh
  vn: { type: String, required: true, trim: true }, // Nghĩa tiếng Việt
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
  updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật
});

// Định nghĩa schema chính cho Vocabulary
const communicationSchema = new Schema(
  {
    image: { type: String, required: true }, // Hình ảnh cho chủ đề từ vựng
    titleEn: { type: String, required: true, trim: true, unique: true }, // Tiêu đề tiếng Anh
    titleVn: { type: String, required: true, trim: true }, // Tiêu đề tiếng Việt
    vocab: [vocabSchema], // Danh sách từ vựng (sử dụng sub-schema `vocabSchema`)
    createdAt: { type: Date, default: Date.now }, // Ngày tạo
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật
  },
  {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  }
);

// Export model
const Communication = models.Communication || model('Communication', communicationSchema);

export default Communication;
