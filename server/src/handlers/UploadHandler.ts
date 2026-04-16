import crypto from "crypto";
import { UploadFile } from "../services/S3Service";

export const HandlePostBucket = async (file: Express.Multer.File): Promise<string> => {
    try {
        const salt = crypto.randomBytes(4).toString("hex");
        const key = `${salt}${file.originalname}`;

        await UploadFile(file.buffer, key, file.mimetype);
        
        return key;
    } catch (error) {
        throw error;
    }
};
