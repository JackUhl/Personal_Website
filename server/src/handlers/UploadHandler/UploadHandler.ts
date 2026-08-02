import crypto from "crypto";

type UploadHandlerDependencies = {
    RetrieveFile: (key: string) => Promise<{ ContentType?: string; Body?: unknown }>;
    UploadFile: (file: Buffer, key: string, contentType: string) => Promise<string>;
    DeleteFile: (key: string) => Promise<void>;
}

export type UploadHandler = {
    HandleRetrieveBucket: (key: string) => Promise<{ ContentType?: string; Body?: unknown }>;
    HandlePostBucket: (file: Express.Multer.File) => Promise<string>;
    HandleDeleteBucket: (key: string) => Promise<void>;
}

export const CreateUploadHandler = (dependencies: UploadHandlerDependencies): UploadHandler => {
    const HandleRetrieveBucket = async (key: string): Promise<{ ContentType?: string; Body?: unknown }> => {
        return dependencies.RetrieveFile(key);
    };

    const HandlePostBucket = async (file: Express.Multer.File): Promise<string> => {
        const salt = crypto.randomBytes(4).toString("hex");
        const key = `${salt}${file.originalname}`;

        await dependencies.UploadFile(file.buffer, key, file.mimetype);

        return key;
    };

    const HandleDeleteBucket = async (key: string): Promise<void> => {
        await dependencies.DeleteFile(key);
    }

    return {
        HandleRetrieveBucket,
        HandlePostBucket,
        HandleDeleteBucket
    };
}
