import { Request, Response } from "express";
import { HandleGetAllBlogs, HandleGetSpecificBlog } from "../handlers/BlogHandler";
import { ObjectId } from "mongodb";

export const GetAllBlogs = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetAllBlogs(req);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const GetSpecificBlog = async (req: Request, res: Response) => {
    try {
        const blogPostId = req.params.blogId;
        if (!ObjectId.isValid(blogPostId)) {
            res.status(400).json("Invalid id format");
        }

        const result = await HandleGetSpecificBlog(req);

        if (!result) {
            res.status(404).json("Blog post not found")
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}