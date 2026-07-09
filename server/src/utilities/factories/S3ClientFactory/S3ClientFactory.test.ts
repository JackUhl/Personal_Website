import { S3Client } from "@aws-sdk/client-s3";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CreateS3Client } from "./S3ClientFactory";

afterEach(() => {
    vi.unstubAllEnvs();
});

describe("CreateS3Client", () => {
    it("returns an S3Client instance", () => {
        vi.stubEnv("AWS_S3_REGION", "us-east-1");
        vi.stubEnv("AWS_ACCESS_KEY_ID", "test-access-key");
        vi.stubEnv("AWS_SECRET_ACCESS_KEY", "test-secret-key");

        const client = CreateS3Client();

        expect(client).toBeInstanceOf(S3Client);
    });

    it("uses environment variables for region and credentials", async () => {
        vi.stubEnv("AWS_S3_REGION", "us-west-2");
        vi.stubEnv("AWS_ACCESS_KEY_ID", "abc123");
        vi.stubEnv("AWS_SECRET_ACCESS_KEY", "secret456");

        const client = CreateS3Client();
        const region = await client.config.region();
        const credentials = await client.config.credentials();

        expect(region).toBe("us-west-2");
        expect(credentials.accessKeyId).toBe("abc123");
        expect(credentials.secretAccessKey).toBe("secret456");
    });
});
