import { BlogContent } from "../../../models/objects/BlogItem";

export default interface IContentSwitcher {
    blogContent: BlogContent;
    editMode: boolean;
    updateBlogContent: (blogContent: BlogContent) => void;
}