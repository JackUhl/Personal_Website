import { BlogItem } from "../../models/objects/BlogItem";

export default interface IBlogArticleFormComponent {
    blogItem: BlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: BlogItem) => void;
}