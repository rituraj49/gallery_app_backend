import mongoose from "mongoose";

export const connectDb = async (url) => {
    try {
        console.log('connecting to database...', url);
        return mongoose.connect(url);
    } catch (error) {
        console.error('error while  connecting to database', error);
    }
}