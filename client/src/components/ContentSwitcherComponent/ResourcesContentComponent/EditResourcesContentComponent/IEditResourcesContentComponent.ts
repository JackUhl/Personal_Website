import { BlogContent, ResourcesContent } from "../../../../models/objects/BlogItem";

export default interface IEditResourcesContentComponent {
    content: ResourcesContent;
    updateBlogContent: (blogContent: BlogContent) => void;
}