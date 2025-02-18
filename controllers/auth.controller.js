import express from "express";
import StatusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
import CreateUserDto from "../dtos/createUserDto.js";
import User from '../models/user.model.js';
import LoginUserDto from "../dtos/loginUserDto.js";
import { createRecord, findOne } from "../services/servce.js";

export const register = async (req, res) => {
    try {
        // const { name, email, password } = req.body;
        const user = CreateUserDto.fromRequestBody(req.body);
        user.validate();
        const hashedPass = await bcrypt.hash(user.password, 15);
        user.password = hashedPass;
        const newUser = await createRecord(User, user);
        // console.log('new user', newUser);

        const token = newUser.createJWT();
        const userResource = { ...newUser.toObject() };
        delete userResource.password;
        return res.status(StatusCodes.CREATED).json({
            user: userResource,
            access_token: token
        });

    } catch (error) {
        console.error('error while registering user', error);
        if(error.code === 11000) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'user already exists' });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'error while registering user' });
    }
}

export const login = async (req, res) => {
    try {
        // const { email, password } = req.body;
        const reqUser = LoginUserDto.fromRequestBody(req.body);
        reqUser.validate();
        // const user = await User.findOne({ email: reqUser.email });
        const user = await findOne(User, { email: reqUser.email });
        if(!user) {
            throw new Error('userNotFound');
        }
        
        const isPassValid = await bcrypt.compare(reqUser.password, user.password);
        if(!isPassValid) {
            throw new Error('invalid password');
        }
        
        const token = user.createJWT();
        const userResource = { ...user.toObject() };
        delete userResource.password;
        return res.status(StatusCodes.OK).json({
            user: userResource,
            access_token: token
        });
    } catch (error) {
        console.error('error while logging in user', error);
        if(error.message === 'userNotFound') {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'user not registered' });
        }
        if(error.message === 'invalid password') {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'invalid credentials' });
        } 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'error while logging in user' });
    }
}