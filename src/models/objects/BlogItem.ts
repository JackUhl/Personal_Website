import IMediaContentComponent from "../../components/MediaContentComponent/IMediaContentComponent";
import ITextContentComponent from "../../components/TextContentComponent/ITextContentComponent";
import { BlogContentType } from "../enums/BlogContentType";

interface BaseContent {
    order: number;
}

interface TextContent extends BaseContent, ITextContentComponent {
    type: BlogContentType.text;
}

interface MediaContent extends BaseContent, IMediaContentComponent {
    type: BlogContentType.media;
}

export type BlogContent = TextContent | MediaContent

export interface BlogItem {
    id: number;
    title: string;
    createdDate: Date;
    editedDate?: Date;
    primaryImage: string;
    shortDescription: string;
    tags: string[];
    content: BlogContent[];
}