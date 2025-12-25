import { Request, Response } from "express";
import { PostsCollection } from "../models/constants/MongoConstants";
import { SetCacheKey } from "../services/CacheService";
import { GetBlogClient } from "../services/MongoService";
import { ObjectId } from "mongodb";

export const GetAllBlogs = async (req: Request, res: Response) => {
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
        res.json(blogPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const GetSpecificBlog = async (req: Request, res: Response) => {
    try {
        const blogClient = await GetBlogClient();

        const blogPostId = req.params.blogId;
        if (!ObjectId.isValid(blogPostId)) {
            res.status(400).send("Invalid Id format");
            return;
        }

        const blogPost = await blogClient.collection(PostsCollection).aggregate([
            {
                $match: {
                    _id: new ObjectId(blogPostId) // Filter by id
                }
            }
        ]).next();

        if (!blogPost) {
            res.status(404).send();
            return;
        }

        SetCacheKey(req.originalUrl, blogPost);
        res.json(blogPost);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}