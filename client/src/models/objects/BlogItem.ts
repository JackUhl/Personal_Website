import IMediaContentComponent from "../../components/MediaContentComponent/IMediaContentComponent";
import IMervContentComponent from "../../components/MervContentComponent/IMervContentComponent";
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

interface MervContent extends BaseContent, IMervContentComponent {
    type: BlogContentType.merv
}

export type BlogContent = TextContent | MediaContent | MervContent

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