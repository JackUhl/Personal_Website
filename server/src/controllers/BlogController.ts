import { Request, Response } from "express";
import { HandleDeleteBlog, HandleGetAllBlogs, HandleGetSpecificBlog, HandlePostBlog, HandlePutBlog } from "../handlers/BlogHandler";
import { ObjectId } from "mongodb";
import { BlogRequestValidator } from "./validators/BlogValidators";

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
        const { error, value } = BlogRequestValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }

        const result = await HandlePostBlog(value);

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

        const { error, value } = BlogRequestValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }

        const result = await HandlePutBlog(id, value);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const DeleteBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.blogId;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json("Invalid id format");
        }

        const result = await HandleDeleteBlog(id);

        if (!result) {
            return res.status(404).send();
        }

        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}