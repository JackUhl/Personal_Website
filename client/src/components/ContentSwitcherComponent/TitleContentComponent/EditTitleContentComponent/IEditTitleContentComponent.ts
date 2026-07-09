import { BlogContent, TitleContent } from "../../../../models/objects/BlogItem";

export default interface IEditTextContentComponent {
    content: TitleContent;
    updateBlogContent: (blogContent: BlogContent) => void;
}