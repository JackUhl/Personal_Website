import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContentType, MutateBlogRequest } from "../../models/data/BlogModels";
import { CreateBlogController } from "./BlogController";
import { MutateBlogRequestValidator } from "./BlogValidators";

type MockResponse = Pick<Response, "status" | "send" | "json">;

type MockBlog = {
    _id: string;
    title: string;
    shortDescription: string;
    createdDate: Date;
    tags: string[];
    content?: unknown[];
};

const createMockResponse = (): MockResponse => {
    const response: MockResponse = {
        status: vi.fn(),
        send: vi.fn(),
        json: vi.fn(),
    };

    (response.status as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.send as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);
    (response.json as unknown as ReturnType<typeof vi.fn>).mockReturnValue(response);

    return response;
};

const createRequestBody = (): MutateBlogRequest => ({
    title: "My Blog",
    primaryImage: "hero.png",
    shortDescription: "summary",
    createdDate: new Date("2024-01-01T00:00:00.000Z"),
    tags: ["dev"],
    content: [
        {
            type: ContentType.Text,
            content: "hello",
        },
    ],
});

describe("CreateBlogController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GetAllBlogs", () => {
        it("returns 200 with all blogs", async () => {
            const blogs = [{ _id: "1", title: "One" }, { _id: "2", title: "Two" }];
            const dependencies = {
                HandleGetAllBlogs: vi.fn().mockResolvedValue(blogs),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = {} as Request;
            const res = createMockResponse();

            await controller.GetAllBlogs(req, res as Response);

            expect(dependencies.HandleGetAllBlogs).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(blogs);
        });

        it("returns 500 when handler throws", async () => {
            const dependencies = {
                HandleGetAllBlogs: vi.fn().mockRejectedValue(new Error("failed")),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = {} as Request;
            const res = createMockResponse();

            await controller.GetAllBlogs(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });

    describe("GetSpecificBlog", () => {
        it("returns 400 for invalid id format", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(false);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "bad-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.GetSpecificBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith("Invalid id format");
            expect(dependencies.HandleGetSpecificBlog).not.toHaveBeenCalled();
        });

        it("returns 404 when blog is not found", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn().mockResolvedValue(null),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "valid-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.GetSpecificBlog(req, res as Response);

            expect(dependencies.HandleGetSpecificBlog).toHaveBeenCalledWith("valid-id");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith("Blog post not found");
        });

        it("returns 200 and blog when found", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const blog: MockBlog = {
                _id: "blog-id",
                title: "Post",
                shortDescription: "desc",
                createdDate: new Date("2024-02-01T00:00:00.000Z"),
                tags: ["tag"],
                content: [],
            };

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn().mockResolvedValue(blog),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "valid-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.GetSpecificBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(blog);
        });
    });

    describe("PostBlog", () => {
        it("returns 400 when validator fails", async () => {
            const requestBody = createRequestBody();
            vi.spyOn(MutateBlogRequestValidator, "validate").mockReturnValue({
                error: {
                    details: [{
                        message: "invalid",
                        path: ["title"],
                        type: "string.base",
                    }],
                },
                value: requestBody,
                warning: undefined,
            } as any);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { body: requestBody } as Request<Record<string, never>, unknown, MutateBlogRequest>;
            const res = createMockResponse();

            await controller.PostBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: [{
                    message: "invalid",
                    path: ["title"],
                    type: "string.base",
                }],
            });
            expect(dependencies.HandlePostBlog).not.toHaveBeenCalled();
        });

        it("returns 200 and created blog when validator passes", async () => {
            const requestBody = createRequestBody();
            vi.spyOn(MutateBlogRequestValidator, "validate").mockReturnValue({
                error: undefined,
                value: requestBody,
                warning: undefined,
            });

            const created = { _id: "created-id", ...requestBody };
            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn().mockResolvedValue(created),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { body: requestBody } as Request<Record<string, never>, unknown, MutateBlogRequest>;
            const res = createMockResponse();

            await controller.PostBlog(req, res as Response);

            expect(dependencies.HandlePostBlog).toHaveBeenCalledWith(requestBody);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(created);
        });
    });

    describe("PutBlog", () => {
        it("returns 400 for invalid id format", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(false);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = {
                params: { blogId: "invalid-id" },
                body: createRequestBody(),
            } as Request<{ blogId: string }, unknown, MutateBlogRequest>;
            const res = createMockResponse();

            await controller.PutBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith("Invalid id format");
            expect(dependencies.HandlePutBlog).not.toHaveBeenCalled();
        });

        it("returns 400 when validator fails", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const requestBody = createRequestBody();
            vi.spyOn(MutateBlogRequestValidator, "validate").mockReturnValue({
                error: {
                    details: [{
                        message: "bad body",
                        path: ["content"],
                        type: "array.base",
                    }],
                },
                value: requestBody,
                warning: undefined,
            } as any);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = {
                params: { blogId: "valid-id" },
                body: requestBody,
            } as Request<{ blogId: string }, unknown, MutateBlogRequest>;
            const res = createMockResponse();

            await controller.PutBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: [{
                    message: "bad body",
                    path: ["content"],
                    type: "array.base",
                }],
            });
            expect(dependencies.HandlePutBlog).not.toHaveBeenCalled();
        });

        it("returns 200 and updated blog on success", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const requestBody = createRequestBody();
            vi.spyOn(MutateBlogRequestValidator, "validate").mockReturnValue({
                error: undefined,
                value: requestBody,
                warning: undefined
            });

            const updated = { _id: "updated-id", ...requestBody };
            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn().mockResolvedValue(updated),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = {
                params: { blogId: "valid-id" },
                body: requestBody,
            } as Request<{ blogId: string }, unknown, MutateBlogRequest>;
            const res = createMockResponse();

            await controller.PutBlog(req, res as Response);

            expect(dependencies.HandlePutBlog).toHaveBeenCalledWith("valid-id", requestBody);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updated);
        });
    });

    describe("DeleteBlog", () => {
        it("returns 400 for invalid id format", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(false);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn(),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "bad-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.DeleteBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith("Invalid id format");
            expect(dependencies.HandleDeleteBlog).not.toHaveBeenCalled();
        });

        it("returns 404 when blog is not found for deletion", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn().mockResolvedValue(null),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "valid-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.DeleteBlog(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it("returns 204 on successful deletion", async () => {
            vi.spyOn(ObjectId, "isValid").mockReturnValue(true);

            const dependencies = {
                HandleGetAllBlogs: vi.fn(),
                HandleGetSpecificBlog: vi.fn(),
                HandlePostBlog: vi.fn(),
                HandlePutBlog: vi.fn(),
                HandleDeleteBlog: vi.fn().mockResolvedValue({ _id: "deleted-id" }),
            };

            const controller = CreateBlogController(dependencies);
            const req = { params: { blogId: "valid-id" } } as unknown as Request<{ blogId: string }>;
            const res = createMockResponse();

            await controller.DeleteBlog(req, res as Response);

            expect(dependencies.HandleDeleteBlog).toHaveBeenCalledWith("valid-id");
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledTimes(1);
        });
    });
});
