export default interface IFilterButtonComponent {
    title: string;
    selectedBlogTags: string[];
    setSelectedBlogTags: (tags: string[]) => void;
}