import { BlogContent, TextContent } from "../../../../models/objects/BlogItem";

export default interface IEditTextContentComponent {
    content: TextContent;
    updateBlogContent: (blogContent: BlogContent) => void;
}