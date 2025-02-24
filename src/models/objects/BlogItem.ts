export interface BlogItem {
    id: number;
    title: string;
    createdDate: Date;
    editedDate?: Date;
    primaryImage: string;
    shortDescription: string;
    tags: string[];
}