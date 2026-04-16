import { DeleteBlog, GetAllBlogs, GetSpecificBlog, PostBlog, PutBlog } from "../repositories/BlogRepository";
import { MutateBlogRequest } from "../models/data/BlogModels";

export const HandleGetAllBlogs = async () => {
    const result = await GetAllBlogs();

    const sanitizedAllBlogs = result.map((blog) => {
        const { content, ...rest } = blog;
        return rest;
    });

    const sortedBlogs = sanitizedAllBlogs.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

    return sortedBlogs;
}

export const HandleGetSpecificBlog = async (id: string) => {
    return await GetSpecificBlog(id);
}

export const HandlePostBlog = async (request: MutateBlogRequest) => {
    return await PostBlog(request);
}

export const HandlePutBlog = async (id: string, request: MutateBlogRequest) => {
    return await PutBlog(id, request);
}

export const HandleDeleteBlog = async (id: string) => {
    return await DeleteBlog(id);
}