export enum ContentType {
    Text = "Text",
    Media = "Media",
    Merv = "Merv",
    Resources = "Resources"
}

export interface TextContent {
    type: ContentType.Text,
    content: string
}

export interface MediaContent {
    type: ContentType.Media,
    media: string
}

export interface MervContent {
    type: ContentType.Merv,
    text: string
}

export interface Resource {
    resource: string,
    link: string
}

export interface ResourcesContent {
    type: ContentType.Resources,
    resources: Resource[]
}

type BlogContentType = TextContent | MediaContent | MervContent | ResourcesContent

export interface PostDataInterface {
    title: string,
    primaryImage: string,
    shortDescription: string,
    createdDate: Date,
    editedDate?: Date,
    tags: string[],
    content: BlogContentType[]
}