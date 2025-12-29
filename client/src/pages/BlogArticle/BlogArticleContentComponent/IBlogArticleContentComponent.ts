import { BlogContent } from "../../../models/objects/BlogItem";

export default interface IBlogArticleContentComponent {
    blogContent: BlogContent[],
    editMode: boolean
}