import crypto from "crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CreateUploadHandler } from "./UploadHandler";


describe("CreateUploadHandler", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("HandleRetrieveBucket calls RetrieveFile with the key and returns the response", async () => {
        const retrieveResponse = {
            ContentType: "image/png",
            Body: "content",
        };

        const dependencies = {
            RetrieveFile: vi.fn().mockResolvedValue(retrieveResponse),
            UploadFile: vi.fn(),
        };

        const handler = CreateUploadHandler(dependencies);

        const result = await handler.HandleRetrieveBucket("image.png");

        expect(dependencies.RetrieveFile).toHaveBeenCalledWith("image.png");
        expect(result).toEqual(retrieveResponse);
    });

    it("HandlePostBucket uploads with generated key and returns that key", async () => {
        vi.spyOn(crypto, "randomBytes").mockImplementation(((size: number, callback?: (err: Error | null, buf: Buffer) => void) => {
            const bytes = Buffer.from([0xde, 0xad, 0xbe, 0xef]);

            if (callback) {
                callback(null, bytes);
                return;
            }

            return bytes;
        }) as typeof crypto.randomBytes);

        const dependencies = {
            RetrieveFile: vi.fn(),
            UploadFile: vi.fn().mockResolvedValue("ignored-by-handler"),
        };

        const handler = CreateUploadHandler(dependencies);

        const file = {
            originalname: "photo.jpg",
            mimetype: "image/jpeg",
            buffer: Buffer.from("file-bytes"),
        } as Express.Multer.File;

        const result = await handler.HandlePostBucket(file);

        expect(crypto.randomBytes).toHaveBeenCalledWith(4);
        expect(dependencies.UploadFile).toHaveBeenCalledWith(file.buffer, "deadbeefphoto.jpg", "image/jpeg");
        expect(result).toBe("deadbeefphoto.jpg");
    });
});
