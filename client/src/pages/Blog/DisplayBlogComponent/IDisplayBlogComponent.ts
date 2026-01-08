import { BlogItem } from "../../../models/objects/BlogItem";

export default interface IDisplayBlogComponent {
    allBlogs: BlogItem[] | undefined;
}