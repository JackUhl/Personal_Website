import { BlogContent, MervContent } from "../../../models/objects/BlogItem";

export default interface IMervContentComponent {
    content: MervContent;
    editMode: boolean;
    updateBlogContent: (blogContent: BlogContent) => void;
}