import { BlogItem } from "../../../models/objects/BlogItem";

export default interface IBlogArticleContentComponent {
    blogItem: BlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: BlogItem) => void;
}