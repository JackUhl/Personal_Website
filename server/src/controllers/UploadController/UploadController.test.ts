import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateUploadController } from "./UploadController";

type MockRequest = Pick<Request, "params" | "file">;
type MockResponse = Pick<Response, "status" | "send" | "json" | "set">;

const createMockResponse = (): MockResponse => {
    const response: MockResponse = {
        status: vi.fn(),
        send: vi.fn(),
        json: vi.fn(),
        set: vi.fn(),
    };

    (response.status as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.send as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.json as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.set as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);

    return response;
};

describe("CreateUploadController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GetFile", () => {
        it("retrieves file by key, sets headers, and pipes body to response", async () => {
            const pipe = vi.fn();
            const dependencies = {
                HandleRetrieveBucket: vi.fn().mockResolvedValue({
                    ContentType: "image/png",
                    Body: { pipe },
                }),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = { params: { 0: "images/file.png" } } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.GetFile(req as Request, res as Response);

            expect(dependencies.HandleRetrieveBucket).toHaveBeenCalledWith("images/file.png");
            expect(res.set).toHaveBeenCalledWith("Content-Type", "image/png");
            expect(res.set).toHaveBeenCalledWith("Cache-Control", "public, max-age=31536000");
            expect(pipe).toHaveBeenCalledWith(res);
        });

        it("returns 404 when storage key does not exist", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn().mockRejectedValue({ name: "NoSuchKey" }),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = { params: { 0: "missing.png" } } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.GetFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it("returns 404 when access is denied", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn().mockRejectedValue({ name: "AccessDenied" }),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = { params: { 0: "private.pdf" } } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.GetFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it("returns 500 on unexpected retrieval errors", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn().mockRejectedValue(new Error("boom")),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = { params: { 0: "any-key" } } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.GetFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });

    describe("PostFile", () => {
        it("returns 400 when file is missing", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn(),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = {} as MockRequest;
            const res = createMockResponse();

            await controller.PostFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "No file provided" });
            expect(dependencies.HandlePostBucket).not.toHaveBeenCalled();
        });

        it("returns 400 when mime type is unsupported", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn(),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = {
                file: {
                    mimetype: "text/plain",
                    size: 20,
                },
            } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.PostFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "File type not supported" });
            expect(dependencies.HandlePostBucket).not.toHaveBeenCalled();
        });

        it("returns 400 when file exceeds max size", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn(),
                HandlePostBucket: vi.fn(),
            };

            const controller = CreateUploadController(dependencies);
            const req = {
                file: {
                    mimetype: "application/pdf",
                    size: 176 * 1024 * 1024,
                },
            } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.PostFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "File exceeds 160MB size limit" });
            expect(dependencies.HandlePostBucket).not.toHaveBeenCalled();
        });

        it("uploads supported file and returns handler result", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn(),
                HandlePostBucket: vi.fn().mockResolvedValue("uploaded-key"),
            };

            const controller = CreateUploadController(dependencies);
            const req = {
                file: {
                    mimetype: "image/jpeg",
                    size: 1024,
                },
            } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.PostFile(req as Request, res as Response);

            expect(dependencies.HandlePostBucket).toHaveBeenCalledWith(req.file);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith("uploaded-key");
        });

        it("returns 500 when upload handler throws", async () => {
            const dependencies = {
                HandleRetrieveBucket: vi.fn(),
                HandlePostBucket: vi.fn().mockRejectedValue(new Error("upload failed")),
            };

            const controller = CreateUploadController(dependencies);
            const req = {
                file: {
                    mimetype: "image/png",
                    size: 512,
                },
            } as unknown as MockRequest;
            const res = createMockResponse();

            await controller.PostFile(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });
});
