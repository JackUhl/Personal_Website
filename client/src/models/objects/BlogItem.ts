import IDisplayMediaContentComponent, { IDisplayMediaContentComponentKeys } from "../../pages/BlogArticle/MediaContentComponent/DisplayMediaContentComponent/IDisplayMediaContentComponent";
import IDisplayMervContentComponent, { IDisplayMervContentComponentKeys } from "../../pages/BlogArticle/MervContentComponent/DisplayMervContentComponent/IDisplayMervContentComponent";
import IDisplayResourcesContentComponent, { defaultResource, IDisplayResourcesContentComponentKeys } from "../../pages/BlogArticle/ResourcesContentComponent/DisplayResourcesContentComponent/IDisplayResourcesContentComponent";
import IDisplayTextContentComponent, { IDisplayTextContentComponentKeys } from "../../pages/BlogArticle/TextContentComponent/DisplayTextContentComponent/IDisplayTextContentComponent";
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

export interface TextContent extends IDisplayTextContentComponent {
    [ContentKeys.Type]: BlogContentType.text;
}

export interface MediaContent extends IDisplayMediaContentComponent {
    [ContentKeys.Type]: BlogContentType.media;
}

export interface MervContent extends IDisplayMervContentComponent {
    [ContentKeys.Type]: BlogContentType.merv
}

export interface ResourcesContent extends IDisplayResourcesContentComponent {
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

export const defaultTextContent: TextContent = {
    [ContentKeys.Type]: BlogContentType.text,
    [IDisplayTextContentComponentKeys.Content]: ""
}

export const defaultMediaContent: MediaContent = {
    [ContentKeys.Type]: BlogContentType.media,
    [IDisplayMediaContentComponentKeys.Media]: "",
    [IDisplayMediaContentComponentKeys.SubText]: ""
}

export const defaultMervContent: MervContent = {
    [ContentKeys.Type]: BlogContentType.merv,
    [IDisplayMervContentComponentKeys.Text]: ""
}

export const defaultResourcesContent: ResourcesContent = {
    [ContentKeys.Type]: BlogContentType.resources,
    [IDisplayResourcesContentComponentKeys.Resources]: [defaultResource]
}

export const BlogContentTypeDefaults: Record<BlogContentType, BlogContent> = {
    [BlogContentType.text]: defaultTextContent,
    [BlogContentType.media]: defaultMediaContent,
    [BlogContentType.merv]: defaultMervContent,
    [BlogContentType.resources]: defaultResourcesContent,
};