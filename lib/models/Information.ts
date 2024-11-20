import mongoose from "mongoose";

export const InfomationSchema = new mongoose.Schema({
  subTitle: String,
  image: String,
  text: String,  
  news: { type: mongoose.Schema.Types.ObjectId, ref: "News" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },  
});

const Infomation = mongoose.models.Infomation || mongoose.model("Infomation", InfomationSchema);
export default Infomation;