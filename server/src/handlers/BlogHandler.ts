import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { GetAllBlogs, GetSpecificBlog } from "../repositories/BlogRepository";

export const HandleGetAllBlogs = async (req: Request) => {
    try {
        const result = await GetAllBlogs();

        const sanatizedAllBlogs = result.map((blog) => {
            const { content, ...rest } = blog;
            return rest;
        });

        SetCacheKey(req.originalUrl, sanatizedAllBlogs);
        return sanatizedAllBlogs;
    } catch (error) {
        throw error;
    }
}

export const HandleGetSpecificBlog = async (req: Request) => {
    try {
        const blogPostId = req.params.blogId;
        const result = await GetSpecificBlog(blogPostId);

        if (result) {
            SetCacheKey(req.originalUrl, result);
        }

        return result;
    } catch (error) {
        throw error;
    }
}