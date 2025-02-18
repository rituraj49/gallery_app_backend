import mongoose from "mongoose";

export const findOne = async (model, query) => {
    return await model.findOne(query);
}

export const createRecord = async (model, record) => {
    return await model.create(record);
}

export const findMany = async (model, query) => {
    return await model.find(query);
}

export const deleteRecord = async (model, id) => {
    return await model.findByIdAndDelete(id);
}

export const paginate = async (model, options) => {
    return await model.find(options?.query).skip(options?.skip).limit(options?.limit);
}

export const countRecords = async (model, query) => {
    return await model.countDocuments(query);
}