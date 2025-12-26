import { BlogItem } from "../../../../models/objects/BlogItem";

export default interface IEditBlogArticleHeader {
    blogItem: BlogItem;
    updatedBlogItem: (updatedBlogItem: BlogItem) => void
}