import { Request, Response } from "express";
import { HandleGetAllBlogs, HandleGetSpecificBlog, HandlePostBlog, HandlePutBlog } from "../handlers/BlogHandler";
import { ObjectId } from "mongodb";

export const GetAllBlogs = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetAllBlogs();

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const GetSpecificBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.blogId;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json("Invalid id format");
        }

        const result = await HandleGetSpecificBlog(id);

        if (!result) {
            return res.status(404).json("Blog post not found")
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const PostBlog = async (req: Request, res: Response) => {
    try {
        const result = await HandlePostBlog(req.body);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const PutBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.blogId;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json("Invalid id format");
        }

        const result = await HandlePutBlog(id, req.body);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}