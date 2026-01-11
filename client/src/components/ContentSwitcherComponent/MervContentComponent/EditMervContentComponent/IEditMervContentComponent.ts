import { BlogContent, MervContent } from "../../../../models/objects/BlogItem";

export interface IEditMervContentComponent {
    content: MervContent;
    updateBlogContent: (blogContent: BlogContent) => void;
}