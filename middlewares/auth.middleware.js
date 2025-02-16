import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { findOne } from "../services/servce.js";
import userModel from "../models/user.model.js";

export const auth = async (req, res, next) => {
    console.log('req headers', req.headers);
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'unauthorized' });
    }
    try {
        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'failed to authenticate token' });
            }
            const foundUser = await findOne(userModel, { _id: decoded.userId });
            req.user = foundUser;
            next();
        })       
    } catch (error) {
        console.error('error while authenticating user', error);   
    }
}