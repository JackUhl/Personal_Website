import {
    Blog,
    BlogRepository,
} from "../repositories/BlogRepository";
import { MutateBlogRequest } from "../models/data/BlogModels";

type BlogHandlerDependencies = Pick<BlogRepository, "GetAllBlogs" | "GetSpecificBlog" | "PostBlog" | "PutBlog" | "DeleteBlog">;

export type BlogListItem = Omit<Blog, "content">;

export type BlogHandler = {
    HandleGetAllBlogs: () => Promise<BlogListItem[]>;
    HandleGetSpecificBlog: (id: string) => Promise<Blog | null>;
    HandlePostBlog: (request: MutateBlogRequest) => Promise<Blog>;
    HandlePutBlog: (id: string, request: MutateBlogRequest) => Promise<Blog | null>;
    HandleDeleteBlog: (id: string) => Promise<Blog | null>;
}

export const CreateBlogHandler = (dependencies: BlogHandlerDependencies): BlogHandler => {
    const HandleGetAllBlogs = async () => {
        const result = await dependencies.GetAllBlogs();

        const sanitizedAllBlogs = result.map((blog) => {
            const { content, ...rest } = blog;
            return rest;
        });

        const sortedBlogs = sanitizedAllBlogs.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

        return sortedBlogs;
    }

    const HandleGetSpecificBlog = async (id: string) => {
        return await dependencies.GetSpecificBlog(id);
    }

    const HandlePostBlog = async (request: MutateBlogRequest) => {
        return await dependencies.PostBlog(request);
    }

    const HandlePutBlog = async (id: string, request: MutateBlogRequest) => {
        return await dependencies.PutBlog(id, request);
    }

    const HandleDeleteBlog = async (id: string) => {
        return await dependencies.DeleteBlog(id);
    }

    return {
        HandleGetAllBlogs,
        HandleGetSpecificBlog,
        HandlePostBlog,
        HandlePutBlog,
        HandleDeleteBlog,
    };
}