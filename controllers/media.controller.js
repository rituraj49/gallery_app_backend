import { StatusCodes } from "http-status-codes";
import mediaModel from "../models/media.model.js";
import { createRecord } from "../services/servce.js";

export const uploadFiles = async (req, res) => {
    try {
        const body = req.body;
        const files = req.files;

        console.log('body:', body);
        console.log('req user:', req.user)
        console.log('files:', files[0].path.replace(/\\/g, '/'));
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
            // console.log('new  media record:', newMedia)
            return res.status(StatusCodes.CREATED).json(newMedia)
    }
        
    } catch (error) {
        console.error('error while uploading files', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'error while uploading files' });
    }
}