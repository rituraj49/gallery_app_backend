import mongoose from "mongoose";

const MediaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fileType: {
        type: String,
        required: true,
        enum: ['image', 'video'] 
    },
    filePath:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: String,
        default: ''
    }
},
    {timeStamps: true}
);

export default mongoose.model('Media', MediaSchema);