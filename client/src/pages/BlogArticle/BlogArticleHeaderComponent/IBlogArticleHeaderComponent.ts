import { BlogItem } from "../../../models/objects/BlogItem";

export default interface IBlogArticleHeaderComponent {
    blogItem: BlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: BlogItem) => void;
}