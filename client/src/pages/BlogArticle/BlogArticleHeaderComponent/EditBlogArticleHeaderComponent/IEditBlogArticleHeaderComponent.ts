import { BlogItem } from "../../../../models/objects/BlogItem";

export default interface IEditBlogArticleHeaderComponent {
    blogItem: BlogItem;
    updatedBlogItem: (updatedBlogItem: BlogItem) => void;
}