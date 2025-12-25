import IMediaContentComponent from "../../pages/BlogArticle/MediaContentComponent/IMediaContentComponent";
import IMervContentComponent from "../../pages/BlogArticle/MervContentComponent/IMervContentComponent";
import IResourcesContentComponent from "../../pages/BlogArticle/ResourcesContentComponent/IResourcesContentComponent";
import ITextContentComponent from "../../pages/BlogArticle/TextContentComponent/ITextContentComponent";
import { BlogContentType } from "../enums/BlogContentType";
import { MongoItem } from "./MongoItem";

export enum BlogItemKeys {
    Title = "title",
    CreatedDate = "createdDate",
    EditedDate = "editedDate",
    PrimaryImage = "primaryImage",
    ShortDescription = "shortDescription",
    Tags = "tags",
    Content = "content"
}

export enum ContentKeys {
    Type = "type"
}

interface TextContent extends ITextContentComponent {
    [ContentKeys.Type]: BlogContentType.text;
}

interface MediaContent extends IMediaContentComponent {
    [ContentKeys.Type]: BlogContentType.media;
}

interface MervContent extends IMervContentComponent {
    [ContentKeys.Type]: BlogContentType.merv
}

interface ResourcesContent extends IResourcesContentComponent {
    [ContentKeys.Type]: BlogContentType.resources
}

export type BlogContent = TextContent | MediaContent | MervContent | ResourcesContent;

export interface BlogItem extends MongoItem {
    [BlogItemKeys.Title]: string;
    [BlogItemKeys.CreatedDate]: string;
    [BlogItemKeys.EditedDate]?: string;
    [BlogItemKeys.PrimaryImage]: string;
    [BlogItemKeys.ShortDescription]: string;
    [BlogItemKeys.Tags]: string[];
    [BlogItemKeys.Content]: BlogContent[];
}