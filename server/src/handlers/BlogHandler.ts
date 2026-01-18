import { Request } from "express";
import { SetCacheKey } from "../helpers/CacheHelper";
import { PostsCollection } from "../models/constants/MongoConstants";
import { GetBlogClient } from "../services/MongoService";
import { ObjectId } from "mongodb";
import { HttpError } from "../models/objects/HttpError";

export const HandleGetAllBlogs = async (req: Request) => {
    try {
        const blogClient = await GetBlogClient();

        const blogPosts = await blogClient.collection(PostsCollection).aggregate([
            {
                $project: {
                    content: 0 // Exclude the 'content' field
                }
            }
        ]).toArray();

        SetCacheKey(req.originalUrl, blogPosts);
        return blogPosts;
    } catch (error) {
        throw error;
    }
}

export const HandleGetSpecificBlog = async (req: Request) => {
    try {
        const blogClient = await GetBlogClient();

        const blogPostId = req.params.blogId;
        if (!ObjectId.isValid(blogPostId)) {
            throw new HttpError(400, "Invalid id format");
        }

        const blogPost = await blogClient.collection(PostsCollection).aggregate([
            {
                $match: {
                    _id: new ObjectId(blogPostId) // Filter by id
                }
            }
        ]).next();

        if (!blogPost) {
            throw new HttpError(404, "Blog post not found");
        }

        SetCacheKey(req.originalUrl, blogPost);
        return blogPost;
    } catch (error) {
        throw error;
    }
}