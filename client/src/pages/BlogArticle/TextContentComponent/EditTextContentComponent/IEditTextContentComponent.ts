import { TextContent } from "../../../../models/objects/BlogItem";

export default interface IEditTextContentComponent {
    content: TextContent;
    updateBlogItems: (updatedTextContent: TextContent) => void;
}