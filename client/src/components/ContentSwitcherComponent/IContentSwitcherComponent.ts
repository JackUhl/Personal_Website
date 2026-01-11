import { BlogContent } from "../../models/objects/BlogItem";

export default interface IContentSwitcherComponent {
    blogContent: BlogContent;
    editMode: boolean;
    updateBlogContent: (blogContent: BlogContent) => void;
}