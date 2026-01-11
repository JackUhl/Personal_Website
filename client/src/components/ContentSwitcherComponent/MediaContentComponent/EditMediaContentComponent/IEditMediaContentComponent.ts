import { BlogContent, MediaContent } from "../../../../models/objects/BlogItem";

export default interface IEditMediaContentComponent {
    content: MediaContent;
    updateBlogContent: (blogContent: BlogContent) => void;
}