import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.createJWT= function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export default mongoose.model('User', UserSchema);