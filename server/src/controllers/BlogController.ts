import { Request, Response } from "express";
import { HandleGetAllBlogs, HandleGetSpecificBlog } from "../handlers/BlogHandler";
import { HttpError } from "../models/objects/HttpError";

export const GetAllBlogs = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetAllBlogs(req);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export const GetSpecificBlog = async (req: Request, res: Response) => {
    try {
        const result = await HandleGetSpecificBlog(req);
        res.json(result);
    } catch (error) {
        console.log(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).send(error.message);
            return;
        }
        res.status(500).send();
    }
}