import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MutateBlogRequestValidator } from "./validators/BlogValidators";
import { BlogHandler } from "../handlers/BlogHandler/BlogHandler";
import { MutateBlogRequest } from "../models/data/BlogModels";

type BlogControllerDependencies = Pick<BlogHandler, "HandleGetAllBlogs" | "HandleGetSpecificBlog" | "HandlePostBlog" | "HandlePutBlog" | "HandleDeleteBlog">;

type BlogIdParams = {
    blogId: string;
}

export type BlogController = {
    GetAllBlogs: (req: Request, res: Response) => Promise<void | Response>;
    GetSpecificBlog: (req: Request<BlogIdParams>, res: Response) => Promise<void | Response>;
    PostBlog: (req: Request<Record<string, never>, unknown, MutateBlogRequest>, res: Response) => Promise<void | Response>;
    PutBlog: (req: Request<BlogIdParams, unknown, MutateBlogRequest>, res: Response) => Promise<void | Response>;
    DeleteBlog: (req: Request<BlogIdParams>, res: Response) => Promise<void | Response>;
}

export const CreateBlogController = (dependencies: BlogControllerDependencies): BlogController => {
    const GetAllBlogs = async (req: Request, res: Response) => {
        try {
            const result = await dependencies.HandleGetAllBlogs();

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    const GetSpecificBlog = async (req: Request<BlogIdParams>, res: Response) => {
        try {
            const id = req.params.blogId;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json("Invalid id format");
            }

            const result = await dependencies.HandleGetSpecificBlog(id);

            if (!result) {
                return res.status(404).json("Blog post not found")
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    const PostBlog = async (req: Request<Record<string, never>, unknown, MutateBlogRequest>, res: Response) => {
        try {
            const { error, value } = MutateBlogRequestValidator.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details });
            }

            const result = await dependencies.HandlePostBlog(value);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    const PutBlog = async (req: Request<BlogIdParams, unknown, MutateBlogRequest>, res: Response) => {
        try {
            const id = req.params.blogId;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json("Invalid id format");
            }

            const { error, value } = MutateBlogRequestValidator.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details });
            }

            const result = await dependencies.HandlePutBlog(id, value);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    const DeleteBlog = async (req: Request<BlogIdParams>, res: Response) => {
        try {
            const id = req.params.blogId;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json("Invalid id format");
            }

            const result = await dependencies.HandleDeleteBlog(id);

            if (!result) {
                return res.status(404).send();
            }

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    return {
        GetAllBlogs,
        GetSpecificBlog,
        PostBlog,
        PutBlog,
        DeleteBlog,
    };
}