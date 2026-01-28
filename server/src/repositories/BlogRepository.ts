import { Model, ObjectId } from "mongoose"
import { PostDataInterface } from "../models/data/BlogModels"
import { CreateMongooseClient } from "../helpers/MongoHelper"
import { BlogDatabase, PostsCollection } from "../models/constants/MongoConstants"
import { PostSchema } from "./schemas/BlogSchemas"

type BlogModels = {
    postModel: Model<PostDataInterface>
}

let models: BlogModels;

const GetBlogModels = async (): Promise<BlogModels> => {
    try {
        const client = await CreateMongooseClient(BlogDatabase);

        const postModel = client.model("PostModel", PostSchema, PostsCollection)

        return { postModel }
    } catch (error) {
        throw error;
    }
}

export const GetAllBlogs = async () => {
    try {
        if (!models) {
            models = await GetBlogModels();
        }

        const allBlogs = await models.postModel.find().lean();

        return allBlogs;
    } catch (error) {
        throw error;
    }
}

export const GetSpecificBlog = async (id: string) => {
    try {
        if (!models) {
            models = await GetBlogModels();
        }

        const specificBlog = await models.postModel.findById(id).lean();

        return specificBlog;
    } catch (error) {
        throw error;
    }
}

export const PostBlog = async (blog: PostDataInterface) => {
    try {
        if(!models) {
            models = await GetBlogModels();
        }

        const addedBlog = await models.postModel.insertOne(blog);
        const sanatizedAddedBlog = addedBlog.toJSON();

        return sanatizedAddedBlog;
    } catch (error) {
        throw error;
    }
}