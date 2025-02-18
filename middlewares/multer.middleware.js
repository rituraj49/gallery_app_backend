import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log('file in multer:', file)
        const filename = file.originalname;
        cb(null, filename);
    }
});

const upload = multer({ storage });

export default upload;