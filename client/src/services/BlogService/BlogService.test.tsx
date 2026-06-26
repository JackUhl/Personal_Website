import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosResponse } from "axios";
import { BlogService } from "./BlogService";
import { BlogApiRoute } from "../../models/constants/RouteConstants";
import { AxiosTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import { BlogItem, MutateBlogItem } from "../../models/objects/BlogItem";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

function createResponse<T>(data: T): AxiosResponse<T> {
    return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse<T>['config'],
    };
}

const baseUrl = `${import.meta.env.VITE_API_URL}${BlogApiRoute}`;

const mockBlogItem: BlogItem = {
    _id: "abc123",
    title: "Test Blog",
    createdDate: "2026-01-01",
    primaryImage: "image.png",
    shortDescription: "A test blog post",
    tags: ["test"],
    content: [],
};

const mockMutateBlogItem: MutateBlogItem = {
    title: "Test Blog",
    createdDate: "2026-01-01",
    primaryImage: "image.png",
    shortDescription: "A test blog post",
    tags: ["test"],
    content: [],
};

describe('BlogService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GetAllBlogs', () => {
        it('calls the correct URL with the correct timeout', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse([mockBlogItem]));

            await BlogService.GetAllBlogs();

            expect(mockedAxios.get).toHaveBeenCalledWith(baseUrl, { timeout: AxiosTimeoutInMs });
        });

        it('returns the list of blog items', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse([mockBlogItem]));

            const response = await BlogService.GetAllBlogs();

            expect(response.data).toEqual([mockBlogItem]);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('network error'));

            await expect(BlogService.GetAllBlogs()).rejects.toThrow('network error');
        });
    });

    describe('GetBlog', () => {
        it('calls the correct URL with the correct timeout', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse(mockBlogItem));

            await BlogService.GetBlog('abc123');

            expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/abc123`, { timeout: AxiosTimeoutInMs });
        });

        it('returns the blog item', async () => {
            mockedAxios.get.mockResolvedValueOnce(createResponse(mockBlogItem));

            const response = await BlogService.GetBlog('abc123');

            expect(response.data).toEqual(mockBlogItem);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('not found'));

            await expect(BlogService.GetBlog('abc123')).rejects.toThrow('not found');
        });
    });

    describe('PostBlog', () => {
        it('calls the correct URL with the correct body and timeout', async () => {
            mockedAxios.post.mockResolvedValueOnce(createResponse(mockBlogItem));

            await BlogService.PostBlog(mockMutateBlogItem);

            expect(mockedAxios.post).toHaveBeenCalledWith(baseUrl, mockMutateBlogItem, { timeout: AxiosTimeoutInMs });
        });

        it('returns the created blog item', async () => {
            mockedAxios.post.mockResolvedValueOnce(createResponse(mockBlogItem));

            const response = await BlogService.PostBlog(mockMutateBlogItem);

            expect(response.data).toEqual(mockBlogItem);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.post.mockRejectedValueOnce(new Error('server error'));

            await expect(BlogService.PostBlog(mockMutateBlogItem)).rejects.toThrow('server error');
        });
    });

    describe('PutBlog', () => {
        it('calls the correct URL with the correct body and timeout', async () => {
            mockedAxios.put.mockResolvedValueOnce(createResponse(mockBlogItem));

            await BlogService.PutBlog('abc123', mockMutateBlogItem);

            expect(mockedAxios.put).toHaveBeenCalledWith(`${baseUrl}/abc123`, mockMutateBlogItem, { timeout: AxiosTimeoutInMs });
        });

        it('returns the updated blog item', async () => {
            mockedAxios.put.mockResolvedValueOnce(createResponse(mockBlogItem));

            const response = await BlogService.PutBlog('abc123', mockMutateBlogItem);

            expect(response.data).toEqual(mockBlogItem);
        });

        it('propagates errors from axios', async () => {
            mockedAxios.put.mockRejectedValueOnce(new Error('server error'));

            await expect(BlogService.PutBlog('abc123', mockMutateBlogItem)).rejects.toThrow('server error');
        });
    });

    describe('DeleteBlog', () => {
        it('calls the correct URL with the correct timeout', async () => {
            mockedAxios.delete.mockResolvedValueOnce(createResponse(null));

            await BlogService.DeleteBlog('abc123');

            expect(mockedAxios.delete).toHaveBeenCalledWith(`${baseUrl}/abc123`, { timeout: AxiosTimeoutInMs });
        });

        it('propagates errors from axios', async () => {
            mockedAxios.delete.mockRejectedValueOnce(new Error('server error'));

            await expect(BlogService.DeleteBlog('abc123')).rejects.toThrow('server error');
        });
    });
});
