import mongoose from 'mongoose';
import Product, { ProductSchema } from './Product';


const typeOfNewsSchema = new mongoose.Schema({
    title:{
        type: String,       
    },
    
    news:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'News',
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

const TypeOfNews = mongoose.models.TypeOfNews || mongoose.model('TypeOfNews', typeOfNewsSchema);

export default TypeOfNews;