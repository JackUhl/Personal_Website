import IMediaContentComponent from "../../pages/BlogArticle/MediaContentComponent/IMediaContentComponent";
import IMervContentComponent from "../../pages/BlogArticle/MervContentComponent/IMervContentComponent";
import IResourcesContentComponent from "../../pages/BlogArticle/ResourcesContentComponent/IResourcesContentComponent";
import ITextContentComponent from "../../pages/BlogArticle/TextContentComponent/ITextContentComponent";
import { BlogContentType } from "../enums/BlogContentType";

interface TextContent extends ITextContentComponent {
    type: BlogContentType.text;
}

interface MediaContent extends IMediaContentComponent {
    type: BlogContentType.media;
}

interface MervContent extends IMervContentComponent {
    type: BlogContentType.merv
}

interface ResourcesContent extends IResourcesContentComponent {
    type: BlogContentType.resources
}

export type BlogContent = TextContent | MediaContent | MervContent | ResourcesContent;

export interface BlogItem {
    id: string;
    title: string;
    createdDate: string;
    editedDate?: string;
    primaryImage: string;
    shortDescription: string;
    tags: string[];
    content: BlogContent[];
}