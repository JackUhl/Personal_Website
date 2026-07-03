import IDisplayMediaContentComponent, { IDisplayMediaContentComponentKeys } from "../../components/ContentSwitcherComponent/MediaContentComponent/DisplayMediaContentComponent/IDisplayMediaContentComponent";
import IDisplayMervContentComponent, { IDisplayMervContentComponentKeys } from "../../components/ContentSwitcherComponent/MervContentComponent/DisplayMervContentComponent/IDisplayMervContentComponent";
import IDisplayResourcesContentComponent, { IDisplayResourcesContentComponentKeys, defaultResource } from "../../components/ContentSwitcherComponent/ResourcesContentComponent/DisplayResourcesContentComponent/IDisplayResourcesContentComponent";
import IDisplayTextContentComponent, { IDisplayTextContentComponentKeys } from "../../components/ContentSwitcherComponent/TextContentComponent/DisplayTextContentComponent/IDisplayTextContentComponent";
import IDisplayTitleContentComponent, { IDisplayTitleContentComponentKeys } from "../../components/ContentSwitcherComponent/TitleContentComponent/DisplayTitleContentComponent/IDisplayTitleContentComponent";
import { BlogContentType } from "../enums/BlogContentType";

export enum BlogItemKeys {
    _Id = "_id",
    Title = "title",
    CreatedDate = "createdDate",
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

export interface TitleContent extends IDisplayTitleContentComponent {
    [ContentKeys.Type]: BlogContentType.title
}

export type BlogContent = TextContent | MediaContent | MervContent | ResourcesContent | TitleContent;

export interface BlogItem {
    [BlogItemKeys._Id]: string;
    [BlogItemKeys.Title]: string;
    [BlogItemKeys.CreatedDate]: string;
    [BlogItemKeys.PrimaryImage]: string;
    [BlogItemKeys.ShortDescription]: string;
    [BlogItemKeys.Tags]: string[];
    [BlogItemKeys.Content]: BlogContent[];
}

export type MutateBlogItem = Omit<BlogItem, BlogItemKeys._Id>

export const defaultMutateBlogItem: MutateBlogItem = {
    [BlogItemKeys.Title]: "",
    [BlogItemKeys.CreatedDate]: "",
    [BlogItemKeys.PrimaryImage]: "",
    [BlogItemKeys.ShortDescription]: "",
    [BlogItemKeys.Tags]: [],
    [BlogItemKeys.Content]: []
}

export const defaultTextContent: TextContent = {
    [ContentKeys.Type]: BlogContentType.text,
    [IDisplayTextContentComponentKeys.Content]: ""
}

export const defaultMediaContent: MediaContent = {
    [ContentKeys.Type]: BlogContentType.media,
    [IDisplayMediaContentComponentKeys.Media]: "",
}

export const defaultMervContent: MervContent = {
    [ContentKeys.Type]: BlogContentType.merv,
    [IDisplayMervContentComponentKeys.Text]: ""
}

export const defaultResourcesContent: ResourcesContent = {
    [ContentKeys.Type]: BlogContentType.resources,
    [IDisplayResourcesContentComponentKeys.Resources]: [defaultResource]
}

export const deafultTitleContentComponent: TitleContent = {
    [ContentKeys.Type]: BlogContentType.title,
    [IDisplayTitleContentComponentKeys.title]: ""
}

export const BlogContentTypeDefaults: Record<BlogContentType, BlogContent> = {
    [BlogContentType.text]: defaultTextContent,
    [BlogContentType.media]: defaultMediaContent,
    [BlogContentType.merv]: defaultMervContent,
    [BlogContentType.resources]: defaultResourcesContent,
    [BlogContentType.title]: deafultTitleContentComponent
};