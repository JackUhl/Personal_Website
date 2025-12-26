import { BlogItem } from "../../../models/objects/BlogItem";

export default interface IBlogArticleHeader {
    blogItem: BlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: BlogItem) => void;
}