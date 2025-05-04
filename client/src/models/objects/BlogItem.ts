import IMediaContentComponent from "../../components/MediaContentComponent/IMediaContentComponent";
import IMervContentComponent from "../../components/MervContentComponent/IMervContentComponent";
import ITextContentComponent from "../../components/TextContentComponent/ITextContentComponent";
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

export type BlogContent = TextContent | MediaContent | MervContent

export interface BlogItem {
    id: number;
    title: string;
    createdDate: string;
    editedDate?: string;
    primaryImage: string;
    shortDescription: string;
    tags: string[];
    content: BlogContent[];
}