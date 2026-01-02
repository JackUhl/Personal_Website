import { BlogItem } from "../../../../models/objects/BlogItem";

export default interface IEditBlogArticleContentComponent {
    blogItem: BlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: BlogItem) => void;
}