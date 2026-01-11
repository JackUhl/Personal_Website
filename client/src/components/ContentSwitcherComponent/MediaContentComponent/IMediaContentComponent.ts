import { BlogContent, MediaContent } from "../../../models/objects/BlogItem"

export interface IMediaContentComponent {
    content: MediaContent;
    editMode: boolean;
    updateBlogContent: (blogContent: BlogContent) => void;
}