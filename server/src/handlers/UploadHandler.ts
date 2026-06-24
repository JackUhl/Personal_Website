import crypto from "crypto";

type UploadHandlerDependencies = {
    RetrieveFile: (key: string) => Promise<{ ContentType?: string; Body?: unknown }>;
    UploadFile: (file: Buffer, key: string, contentType: string) => Promise<string>;
}

export type UploadHandler = {
    HandleRetrieveBucket: (key: string) => Promise<{ ContentType?: string; Body?: unknown }>;
    HandlePostBucket: (file: Express.Multer.File) => Promise<string>;
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

    return {
        HandleRetrieveBucket,
        HandlePostBucket,
    };
}
