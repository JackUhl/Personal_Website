import { Request, Response } from "express";
import { PostsCollection } from "../constants/MongoConstants";
import { GetCacheKey, SetCacheKey } from "../services/CacheService";
import { GetBlogClient } from "../services/MongoService";

export const GetAllBlogs = async (req: Request, res: Response) => {
    try {
        let cacheKey = req.originalUrl;
        let cachedValue = GetCacheKey(cacheKey);

        if(cachedValue) {
            console.log("Successfully fetched all blog data from cached value");
            res.json(cachedValue);
            return;
        }

        const blogClient = await GetBlogClient();

        const blogPosts = await blogClient.collection(PostsCollection).aggregate([
            {
                $project: {
                    _id: 0, // Exclude the '_id' field
                    content: 0 // Exclude the 'content' field
                }
            }
        ]).toArray();

        SetCacheKey(cacheKey, blogPosts);
        console.log("Successfully fetched all blog data from MongoDB");
        res.json(blogPosts);
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
}

export const GetSpecificBlog = async (req: Request, res: Response) => {
    try {
        let cacheKey = req.originalUrl;
        let cachedValue = GetCacheKey(cacheKey);
    
        if(cachedValue) {
            console.log("Successfully fetched specific blog data from cached value");
            res.json(cachedValue);
            return;
        }

        const blogClient = await GetBlogClient();
        
        const blogPostId = req.params.blogId;
        const blogPost = await blogClient.collection(PostsCollection).aggregate([
          {
            $match: {
                id: blogPostId // Filter by postId
            }
          },
          {
            $project: {
                _id: 0, // Exclude the '_id' field
            }
          }
        ]).next();
    
        if(!blogPost) {
          res.status(404).send();
          return;
        }
    
        SetCacheKey(cacheKey, blogPost);
        console.log("Successfully fetched specific blog data from MongoDB");
        res.json(blogPost);
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
}