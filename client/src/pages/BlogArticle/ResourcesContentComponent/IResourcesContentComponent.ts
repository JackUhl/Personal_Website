import { BlogContent, ResourcesContent } from "../../../models/objects/BlogItem";

export default interface IResourcesContentComponent {
    content: ResourcesContent;
    editMode: boolean;
    updateBlogContent: (blogContent: BlogContent) => void;
}