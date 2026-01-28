import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { GetAllBlogs, GetSpecificBlog, PostBlog } from "../repositories/BlogRepository";
import { PostDataInterface } from "../models/data/BlogModels";

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

export const HandlePostBlog = async (req: Request) => {
    try {
        const blog = req.body as PostDataInterface;
        const result = await PostBlog(blog);
        return result;
    } catch (error) {
        throw error;
    }
}