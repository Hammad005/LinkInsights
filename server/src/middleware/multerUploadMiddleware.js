import multer from "multer";

const storage = multer.memoryStorage();

const multerUploadMiddleware = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB 
    },
 });

export default multerUploadMiddleware;