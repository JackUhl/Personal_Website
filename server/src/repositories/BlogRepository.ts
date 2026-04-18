import { Model } from "mongoose"
import { MutateBlogRequest } from "../models/data/BlogModels"
import { CreateMongooseClient } from "../helpers/MongoHelper"
import { BlogDatabase, PostsCollection } from "../models/constants/MongoConstants"
import { PostSchema } from "./schemas/BlogSchemas"

type BlogModels = {
    postModel: Model<MutateBlogRequest>
}

let models: BlogModels;

const GetBlogModels = async (): Promise<BlogModels> => {
    const client = await CreateMongooseClient(BlogDatabase);

    const postModel = client.model("PostModel", PostSchema, PostsCollection)

    return { postModel }
}

export const GetAllBlogs = async () => {
    if (!models) {
        models = await GetBlogModels();
    }

    const allBlogs = await models.postModel.find().lean();

    return allBlogs;
}

export const GetSpecificBlog = async (id: string) => {
    if (!models) {
        models = await GetBlogModels();
    }

    const specificBlog = await models.postModel.findById(id).lean();

    return specificBlog;
}

export const PostBlog = async (blog: MutateBlogRequest) => {
    if (!models) {
        models = await GetBlogModels();
    }

    const addedBlog = (await models.postModel.create(blog)).toJSON();

    return addedBlog;
}

export const PutBlog = async (id: string, blog: MutateBlogRequest) => {
    if (!models) {
        models = await GetBlogModels();
    }

    const replacedBlog = await models.postModel.findByIdAndUpdate(
        id,
        blog,
        { new: true }
    ).lean();

    return replacedBlog;
}

export const DeleteBlog = async (id: string) => {
    if (!models) {
        models = await GetBlogModels();
    }

    const deletedBlog = await models.postModel.findByIdAndDelete(id).lean();

    return deletedBlog;
}