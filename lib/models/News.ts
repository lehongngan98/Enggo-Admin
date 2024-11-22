import { info } from 'console';
import mongoose from 'mongoose';
import { InfomationSchema } from './Information';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: String,
    image: {
        type: String,
        required: true,
    },
    information:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Infomation',
        }
    ],    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;