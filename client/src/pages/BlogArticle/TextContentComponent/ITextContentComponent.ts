import { BlogContent, TextContent } from "../../../models/objects/BlogItem";

export default interface ITextContentComponent {
    content: TextContent,
    editMode: boolean,
    updateBlogContent: (blogContent: BlogContent) => void;
}