import { BlogItem } from "../../../../models/objects/BlogItem";

export default interface IFilterButtonsComponent {
    allBlogs: BlogItem[];
    selectedBlogTags: string[];
    setSelectedBlogTags: (tags: string[]) => void;
}