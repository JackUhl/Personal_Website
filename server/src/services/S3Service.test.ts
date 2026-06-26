import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CreateS3Service } from "./S3Service";


describe("CreateS3Service", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it("RetrieveFile sends GetObjectCommand with bucket and key", async () => {
        vi.stubEnv("AWS_S3_BUCKET_NAME", "test-bucket");

        const send = vi.fn().mockResolvedValue({ Body: "file-stream" });
        const client = { send } as unknown as S3Client;
        const service = CreateS3Service(client);

        const result = await service.RetrieveFile("resume.pdf");

        expect(send).toHaveBeenCalledTimes(1);
        const command = send.mock.calls[0][0] as GetObjectCommand;
        expect(command).toBeInstanceOf(GetObjectCommand);
        expect(command.input).toEqual({
            Bucket: "test-bucket",
            Key: "resume.pdf",
        });
        expect(result).toEqual({ Body: "file-stream" });
    });

    it("UploadFile sends PutObjectCommand and returns key", async () => {
        vi.stubEnv("AWS_S3_BUCKET_NAME", "test-bucket");

        const send = vi.fn().mockResolvedValue({});
        const client = { send } as unknown as S3Client;
        const service = CreateS3Service(client);

        const file = Buffer.from("hello world");
        const key = "image.png";
        const contentType = "image/png";

        const result = await service.UploadFile(file, key, contentType);

        expect(send).toHaveBeenCalledTimes(1);
        const command = send.mock.calls[0][0] as PutObjectCommand;
        expect(command).toBeInstanceOf(PutObjectCommand);
        expect(command.input).toEqual({
            Bucket: "test-bucket",
            Key: "image.png",
            Body: file,
            ContentType: "image/png",
        });
        expect(result).toBe("image.png");
    });
});
