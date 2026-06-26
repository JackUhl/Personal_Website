import { describe, expect, it, vi, beforeEach } from "vitest";
import { Connection, Types } from "mongoose";
import { ContentType, MutateBlogRequest } from "../../models/data/BlogModels";
import { CreateBlogRepository } from "./BlogRepository";

const createBlogRequest = (title: string = "Test Blog"): MutateBlogRequest => ({
    title,
    primaryImage: `${title}.png`,
    shortDescription: `${title} description`,
    createdDate: new Date("2024-01-01T00:00:00.000Z"),
    tags: ["tag1", "tag2"],
    content: [
        {
            type: ContentType.Text,
            content: `${title} content`,
        },
    ],
});

const createBlogDocument = (request: MutateBlogRequest = createBlogRequest()) => ({
    ...request,
    _id: new Types.ObjectId(),
    __v: 0,
});

const createMockModel = () => ({
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
});

const createMockConnection = (mockModel: ReturnType<typeof createMockModel>) => ({
    model: vi.fn().mockReturnValue(mockModel),
}) as unknown as Connection;

describe("CreateBlogRepository", () => {
    let mockModel: ReturnType<typeof createMockModel>;
    let mockConnection: Connection;

    beforeEach(() => {
        vi.clearAllMocks();
        mockModel = createMockModel();
        mockConnection = createMockConnection(mockModel);
    });

    it("registers the model with the correct collection name", () => {
        CreateBlogRepository(mockConnection);

        expect((mockConnection as ReturnType<typeof createMockConnection>).model).toHaveBeenCalledWith(
            "PostModel",
            expect.anything(),
            "Posts"
        );
    });

    describe("GetAllBlogs", () => {
        it("returns all blogs", async () => {
            const blogs = [createBlogDocument(), createBlogDocument(createBlogRequest("Second"))];
            mockModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue(blogs) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.GetAllBlogs();

            expect(mockModel.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(blogs);
        });

        it("returns an empty array when there are no blogs", async () => {
            mockModel.find.mockReturnValue({ lean: vi.fn().mockResolvedValue([]) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.GetAllBlogs();

            expect(result).toEqual([]);
        });
    });

    describe("GetSpecificBlog", () => {
        it("returns the blog matching the given id", async () => {
            const blog = createBlogDocument();
            const id = blog._id.toString();
            mockModel.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(blog) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.GetSpecificBlog(id);

            expect(mockModel.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(blog);
        });

        it("returns null when no blog is found", async () => {
            mockModel.findById.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.GetSpecificBlog("nonexistent-id");

            expect(result).toBeNull();
        });
    });

    describe("PostBlog", () => {
        it("creates and returns the new blog", async () => {
            const request = createBlogRequest();
            const created = createBlogDocument(request);
            mockModel.create.mockResolvedValue({ toJSON: vi.fn().mockReturnValue(created) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.PostBlog(request);

            expect(mockModel.create).toHaveBeenCalledWith(request);
            expect(result).toEqual(created);
        });
    });

    describe("PutBlog", () => {
        it("updates and returns the replaced blog", async () => {
            const request = createBlogRequest("Updated");
            const updated = createBlogDocument(request);
            const id = updated._id.toString();
            mockModel.findByIdAndUpdate.mockReturnValue({ lean: vi.fn().mockResolvedValue(updated) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.PutBlog(id, request);

            expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, request, { new: true });
            expect(result).toEqual(updated);
        });

        it("returns null when no blog is found to update", async () => {
            mockModel.findByIdAndUpdate.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.PutBlog("nonexistent-id", createBlogRequest());

            expect(result).toBeNull();
        });
    });

    describe("DeleteBlog", () => {
        it("deletes and returns the removed blog", async () => {
            const blog = createBlogDocument();
            const id = blog._id.toString();
            mockModel.findByIdAndDelete.mockReturnValue({ lean: vi.fn().mockResolvedValue(blog) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.DeleteBlog(id);

            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
            expect(result).toEqual(blog);
        });

        it("returns null when no blog is found to delete", async () => {
            mockModel.findByIdAndDelete.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

            const repository = CreateBlogRepository(mockConnection);
            const result = await repository.DeleteBlog("nonexistent-id");

            expect(result).toBeNull();
        });
    });
});
