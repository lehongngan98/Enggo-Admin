import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    content: String,
    image:{
        type: String,
        required: true,
    },
    information:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Information',
        }
    ],

    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    }
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;