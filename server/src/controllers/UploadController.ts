import { Request, Response } from "express";
import "multer";
import { HandlePostBucket } from "../handlers/UploadHandler";
import { RetrieveFile } from "../services/S3Service";

const supportedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "application/pdf",
];

const maxFileSize = 20 * 1024 * 1024; // 20MB

export const GetFile = async (req: Request, res: Response) => {
    try {
        const key = req.params[0];
        
        const response = await RetrieveFile(key);

        if (!response.Body) {
            return res.status(404).send();
        }

        res.set("Content-Type", response.ContentType);
        res.set("Cache-Control", "public, max-age=31536000");

        const responseStream = response.Body as NodeJS.ReadableStream
        responseStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

export const PostFile = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file provided" });
        }

        if (!supportedMimeTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: "File type not supported" });
        }

        if (file.size > maxFileSize) {
            return res.status(400).json({ error: "File exceeds 20MB size limit" });
        }

        const result = await HandlePostBucket(file);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};
