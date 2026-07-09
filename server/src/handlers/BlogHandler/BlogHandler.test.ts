import { Types } from "mongoose";
import { describe, expect, it, vi } from "vitest";

import { ContentType, MutateBlogRequest } from "../../models/data/BlogModels";
import { CreateBlogHandler } from "./BlogHandler";

const createBlog = (title: string, createdDate: Date) => {
    return {
        _id: new Types.ObjectId(),
        __v: 0,
        title,
        primaryImage: `${title}.png`,
        shortDescription: `${title} description`,
        createdDate,
        tags: ["tag"],
        content: [
            {
                type: ContentType.Text,
                content: `${title} content`,
            },
        ],
    };
};

describe("CreateBlogHandler", () => {
    it("HandleGetAllBlogs removes content and sorts by createdDate descending", async () => {
        const older = createBlog("Older", new Date("2023-01-01T00:00:00.000Z"));
        const newer = createBlog("Newer", new Date("2024-01-01T00:00:00.000Z"));

        const dependencies = {
            GetAllBlogs: vi.fn().mockResolvedValue([older, newer]),
            GetSpecificBlog: vi.fn(),
            PostBlog: vi.fn(),
            PutBlog: vi.fn(),
            DeleteBlog: vi.fn(),
        };

        const handler = CreateBlogHandler(dependencies);

        const result = await handler.HandleGetAllBlogs();

        expect(dependencies.GetAllBlogs).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("Newer");
        expect(result[1].title).toBe("Older");
        expect(result[0]).not.toHaveProperty("content");
        expect(result[1]).not.toHaveProperty("content");
    });

    it("HandleGetSpecificBlog calls dependency with id and returns result", async () => {
        const existing = createBlog("Existing", new Date("2024-04-01T00:00:00.000Z"));

        const dependencies = {
            GetAllBlogs: vi.fn(),
            GetSpecificBlog: vi.fn().mockResolvedValue(existing),
            PostBlog: vi.fn(),
            PutBlog: vi.fn(),
            DeleteBlog: vi.fn(),
        };

        const handler = CreateBlogHandler(dependencies);

        await expect(handler.HandleGetSpecificBlog("blog-id")).resolves.toEqual(existing);
        expect(dependencies.GetSpecificBlog).toHaveBeenCalledWith("blog-id");
    });

    it("HandlePostBlog calls dependency with request and returns result", async () => {
        const request: MutateBlogRequest = {
            title: "My Post",
            primaryImage: "post.png",
            shortDescription: "summary",
            createdDate: new Date("2024-05-01T00:00:00.000Z"),
            tags: ["dev"],
            content: [
                {
                    type: ContentType.Text,
                    content: "hello",
                },
            ],
        };

        const posted = createBlog("Posted", new Date("2024-05-01T00:00:00.000Z"));

        const dependencies = {
            GetAllBlogs: vi.fn(),
            GetSpecificBlog: vi.fn(),
            PostBlog: vi.fn().mockResolvedValue(posted),
            PutBlog: vi.fn(),
            DeleteBlog: vi.fn(),
        };

        const handler = CreateBlogHandler(dependencies);

        await expect(handler.HandlePostBlog(request)).resolves.toEqual(posted);
        expect(dependencies.PostBlog).toHaveBeenCalledWith(request);
    });

    it("HandlePutBlog calls dependency with id and request and returns result", async () => {
        const request: MutateBlogRequest = {
            title: "My Post",
            primaryImage: "post.png",
            shortDescription: "summary",
            createdDate: new Date("2024-05-01T00:00:00.000Z"),
            tags: ["dev"],
            content: [
                {
                    type: ContentType.Text,
                    content: "hello",
                },
            ],
        };

        const updated = createBlog("Updated", new Date("2024-06-01T00:00:00.000Z"));

        const dependencies = {
            GetAllBlogs: vi.fn(),
            GetSpecificBlog: vi.fn(),
            PostBlog: vi.fn(),
            PutBlog: vi.fn().mockResolvedValue(updated),
            DeleteBlog: vi.fn(),
        };

        const handler = CreateBlogHandler(dependencies);

        await expect(handler.HandlePutBlog("blog-id", request)).resolves.toEqual(updated);
        expect(dependencies.PutBlog).toHaveBeenCalledWith("blog-id", request);
    });

    it("HandleDeleteBlog calls dependency with id and returns result", async () => {
        const deleted = createBlog("Deleted", new Date("2024-07-01T00:00:00.000Z"));

        const dependencies = {
            GetAllBlogs: vi.fn(),
            GetSpecificBlog: vi.fn(),
            PostBlog: vi.fn(),
            PutBlog: vi.fn(),
            DeleteBlog: vi.fn().mockResolvedValue(deleted),
        };

        const handler = CreateBlogHandler(dependencies);

        await expect(handler.HandleDeleteBlog("blog-id")).resolves.toEqual(deleted);
        expect(dependencies.DeleteBlog).toHaveBeenCalledWith("blog-id");
    });
});
