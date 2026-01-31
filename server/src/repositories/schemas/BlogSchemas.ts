import { Schema } from "mongoose";
import { ContentType, PostDataInterface } from "../../models/data/BlogModels";

const ContentBase = new Schema({
    type: { type: String, required: true, enum: Object.values(ContentType) }
}, { _id: false, discriminatorKey: "type" });

const TextContentSchema = new Schema({
    content: { type: String, required: true }
}, { _id: false });

const MediaContentSchema = new Schema({
    media: { type: String, required: true }
}, { _id: false });

const MervContentSchema = new Schema({
    text: { type: String, required: true }
}, { _id: false });

const ResourcesContentSchema = new Schema({
    resources: [{
        resource: { type: String, required: true },
        link: { type: String, required: true }
    }]
}, { _id: false });

export const PostSchema = new Schema<PostDataInterface>({
    title: {
        type: String,
        required: true
    },
    primaryImage: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    editedDate: {
        type: Date,
        required: false
    },
    tags: {
        type: [String],
        required: true
    },
    content: {
        type: [ContentBase],
        required: true
    }
}, { versionKey: false });

(PostSchema.path("content") as any).discriminator(ContentType.Text, TextContentSchema);
(PostSchema.path("content") as any).discriminator(ContentType.Media, MediaContentSchema);
(PostSchema.path("content") as any).discriminator(ContentType.Merv, MervContentSchema);
(PostSchema.path("content") as any).discriminator(ContentType.Resources, ResourcesContentSchema);