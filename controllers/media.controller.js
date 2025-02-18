import { StatusCodes } from "http-status-codes";
import mediaModel from "../models/media.model.js";
import { countRecords, createRecord, deleteRecord, findMany, paginate } from "../services/servce.js";

export const uploadFiles = async (req, res) => {
    try {
        const body = req.body;
        const files = req.files;

        console.log('body:', body);
        console.log('req user:', req.user)
        console.log('files:', files)
        // console.log('files:', files[0].path.replace(/\\/g, '/'));
        let allMedia = [];
        for(const file of files) {
            let mediaType;
            if(file.mimetype.startsWith('image/')) {
                mediaType = 'image';
            } else if(file.mimetype.startsWith('video/')) {
                mediaType = 'video';
            } else {
                throw new Error('file type not supported');
            }
            const newMediaData = {
                title: file.filename,
                userId: req.user._id,
                fileType: mediaType,
                filePath: file.path.replace(/\\/g, '/'),
                description: body.description,
                tags: body.tags
            }
            const newMedia = await createRecord(mediaModel, newMediaData);
            console.log('new  media record:', newMedia)
            allMedia.push(newMedia);
        }
        return res.status(StatusCodes.CREATED).json({
            message: 'files uploaded successfully',
            data: allMedia
        })
        
    } catch (error) {
        console.error('error while uploading files', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'error while uploading files' });
    }
}

export const fetchUserFiles = async (req, res) => {
    try {
        const user = req.user;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = await countRecords(mediaModel, { userId: user._id });
        const userFiles = await paginate(mediaModel, { query: { userId: user._id }, skip, limit });
        console.log('user files:', userFiles)
        return res.status(StatusCodes.OK).json({
            message: 'user files fetched successfully',
            data: userFiles,
            page,
            limit,
            total: total,
            lastPage: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error('error while fetching user files', error);
    }
}

export const deleteUserFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const deletedFile = await deleteRecord(mediaModel, fileId);
        return res.status(StatusCodes.OK).json({
            message: 'file deleted successfully',
            data: deletedFile
        })
    } catch (error) {
        console.error('error while deleting user file', error);
    }
}