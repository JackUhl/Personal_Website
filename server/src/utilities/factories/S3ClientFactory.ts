import { S3Client } from "@aws-sdk/client-s3";

export function CreateS3Client(): S3Client {
    return new S3Client({
        region: process.env.AWS_S3_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    });
}