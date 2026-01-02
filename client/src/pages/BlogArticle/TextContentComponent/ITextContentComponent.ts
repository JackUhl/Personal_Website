import { TextContent } from "../../../models/objects/BlogItem";

export default interface ITextContentComponent {
    content: TextContent,
    editMode: boolean,
    updatedBlogItem: (updatedBlogItem: TextContent) => void;
}