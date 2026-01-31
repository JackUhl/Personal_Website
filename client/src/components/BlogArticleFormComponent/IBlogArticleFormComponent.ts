import { BlogItem } from "../../models/objects/BlogItem";

export default interface IBlogArticleFormComponent {
    blogItem: BlogItem;
    updateBlogItem: (blogItem: BlogItem) => void;
}