import mongoose from "mongoose";

export const findOne = async (model, query) => {
    return await model.findOne(query);
}

export const createRecord = async (model, record) => {
    return await model.create(record);
}