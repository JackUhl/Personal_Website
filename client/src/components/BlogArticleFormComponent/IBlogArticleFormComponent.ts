import { CreateBlogItem } from "../../models/objects/BlogItem";

export default interface IEditBlogArticleContentComponent {
    blogItem: CreateBlogItem;
    editMode: boolean;
    updateBlogItem: (blogItem: CreateBlogItem) => void;
}