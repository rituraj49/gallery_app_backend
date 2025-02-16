import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { uploadFiles } from "../controllers/media.controller.js";
import upload from "../middlewares/multer.middleware.js";

const mediaRouter = express.Router();

mediaRouter.post('/upload', auth, upload.array('files'), uploadFiles);

export default mediaRouter;