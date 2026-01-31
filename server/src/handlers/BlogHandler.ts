import { DeleteBlog, GetAllBlogs, GetSpecificBlog, PostBlog, PutBlog } from "../repositories/BlogRepository";
import { PostDataInterface } from "../models/data/BlogModels";

export const HandleGetAllBlogs = async () => {
    try {
        const result = await GetAllBlogs();

        const sanatizedAllBlogs = result.map((blog) => {
            const { content, ...rest } = blog;
            return rest;
        });

        return sanatizedAllBlogs;
    } catch (error) {
        throw error;
    }
}

export const HandleGetSpecificBlog = async (id: string) => {
    try {
        const result = await GetSpecificBlog(id);
        return result;
    } catch (error) {
        throw error;
    }
}

export const HandlePostBlog = async (request: PostDataInterface) => {
    try {
        const result = await PostBlog(request);
        return result;
    } catch (error) {
        throw error;
    }
}

export const HandlePutBlog = async (id: string, request: PostDataInterface) => {
    try {
        const result = await PutBlog(id, request);
        return result;
    } catch (error) {
        throw error;
    }
}

export const HandleDeleteBlog = async (id: string) => {
    try {
        const result = await DeleteBlog(id);
        return result;
    } catch (error) {
        throw error;
    }
}