import { GetObjectCommand, GetObjectCommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type S3Service = {
    RetrieveFile: (key: string) => Promise<GetObjectCommandOutput>;
    UploadFile: (file: Buffer, key: string, contentType: string) => Promise<string>;
}

export const CreateS3Service = (client: S3Client): S3Service => {
    const RetrieveFile = async (key: string): Promise<GetObjectCommandOutput> => {
        return await client.send(new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
        }));
    }

    const UploadFile = async (file: Buffer, key: string, contentType: string): Promise<string> => {
        await client.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
            Body: file,
            ContentType: contentType,
        }));

        return key;
    }

    return {
        RetrieveFile,
        UploadFile,
    };
}
