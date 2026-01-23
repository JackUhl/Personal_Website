import { Schema } from "mongoose";
import { PostDataInterface } from "../../models/data/BlogModels";

export const PostSchema = new Schema<PostDataInterface>();