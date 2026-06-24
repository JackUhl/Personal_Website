import { Request, Response } from "express";
import "multer";
import { UploadHandler } from "../handlers/UploadHandler";

const supportedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "application/pdf",
];

const maxFileSize = 175 * 1024 * 1024; // 175MB

type UploadControllerDependencies = UploadHandler;

export type UploadController = {
    GetFile: (req: Request, res: Response) => Promise<void | Response>;
    PostFile: (req: Request, res: Response) => Promise<void | Response>;
}

export const CreateUploadController = (dependencies: UploadControllerDependencies): UploadController => {
    const GetFile = async (req: Request, res: Response) => {
        try {
            const key = req.params[0];

            const response = await dependencies.HandleRetrieveBucket(key);

            res.set("Content-Type", response.ContentType);
            res.set("Cache-Control", "public, max-age=31536000");

            const responseStream = response.Body as NodeJS.ReadableStream
            responseStream.pipe(res);
        } catch (error: any) {
            if (error?.name === "NoSuchKey" || error?.name === "AccessDenied") {
                return res.status(404).send();
            }
            console.error(error);
            res.status(500).send();
        }
    };

    const PostFile = async (req: Request, res: Response) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: "No file provided" });
            }

            if (!supportedMimeTypes.includes(file.mimetype)) {
                return res.status(400).json({ error: "File type not supported" });
            }

            if (file.size > maxFileSize) {
                return res.status(400).json({ error: "File exceeds 160MB size limit" });
            }

            const result = await dependencies.HandlePostBucket(file);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    };

    return {
        GetFile,
        PostFile,
    };
}
