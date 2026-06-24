import { Connection, Model, Types } from "mongoose"
import { MutateBlogRequest } from "../models/data/BlogModels"
import { PostsCollection } from "../models/constants/MongoConstants"
import { PostSchema } from "./schemas/BlogSchemas"

type BlogModels = {
    postModel: Model<MutateBlogRequest>
}

export type Blog = MutateBlogRequest & {
    _id: Types.ObjectId;
    __v: number;
}

export type BlogRepository = {
    GetAllBlogs: () => Promise<Blog[]>;
    GetSpecificBlog: (id: string) => Promise<Blog | null>;
    PostBlog: (blog: MutateBlogRequest) => Promise<Blog>;
    PutBlog: (id: string, blog: MutateBlogRequest) => Promise<Blog | null>;
    DeleteBlog: (id: string) => Promise<Blog | null>;
}

export const CreateBlogRepository = (client: Connection): BlogRepository => {
    const models: BlogModels = {
        postModel: client.model("PostModel", PostSchema, PostsCollection),
    };

    const GetAllBlogs = async () => {

        const allBlogs = await models.postModel.find().lean();

        return allBlogs;
    }

    const GetSpecificBlog = async (id: string) => {

        const specificBlog = await models.postModel.findById(id).lean();

        return specificBlog;
    }

    const PostBlog = async (blog: MutateBlogRequest) => {

        const addedBlog = (await models.postModel.create(blog)).toJSON();

        return addedBlog;
    }

    const PutBlog = async (id: string, blog: MutateBlogRequest) => {

        const replacedBlog = await models.postModel.findByIdAndUpdate(
            id,
            blog,
            { new: true }
        ).lean();

        return replacedBlog;
    }

    const DeleteBlog = async (id: string) => {

        const deletedBlog = await models.postModel.findByIdAndDelete(id).lean();

        return deletedBlog;
    }

    return {
        GetAllBlogs,
        GetSpecificBlog,
        PostBlog,
        PutBlog,
        DeleteBlog,
    };
}
