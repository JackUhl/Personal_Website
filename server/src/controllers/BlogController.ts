import { Request, Response } from "express";
import { BlogDatabase, PostsCollection } from "../models/constants/MongoConstants";
import { Db } from "mongodb";
import { ConnectMongoDb } from "../services/MongoService";
import { cache } from "../services/CacheService";

var mongoBlogClient: Db;

ConnectMongoDb(BlogDatabase).then((client) => {
  mongoBlogClient = client;
  console.log(`Successfully connected to ${BlogDatabase} database`);
}).catch(() => {
  console.log(`Failed to connect to ${BlogDatabase} database`);
})

export const AllBlogs = async (req: Request, res: Response) => {
    try {
        let cacheKey = req.originalUrl;
        let cachedValue = cache.get(cacheKey);

        if(cachedValue) {
            res.json(cachedValue);
            return;
        }

        const blogPosts = await mongoBlogClient.collection(PostsCollection).aggregate([
            {
                $project: {
                    _id: 0, // Exclude the '_id' field
                    content: 0 // Exclude the 'content' field
                }
            }
        ]).toArray();
        cache.set(cacheKey, blogPosts);

        res.json(blogPosts);
    } catch {
        res.status(500).send();
    }
}

export const SpecificBlog = async (req: Request, res: Response) => {
    try {
        let cacheKey = req.originalUrl;
        let cachedValue = cache.get(cacheKey);
    
        if(cachedValue) {
            res.json(cachedValue);
            return;
        }
        
        const blogPostId = req.params.blogId;
        const blogPost = await mongoBlogClient.collection(PostsCollection).aggregate([
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
    
        cache.set(cacheKey, blogPost);
    
        res.json(blogPost);
    } catch {
        res.status(500).send();
    }
}