export enum ContentType {
    Text = "Text",
    Media = "Media",
    Merv = "Merv",
    Resources = "Resources",
    Title = "Title"
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

export interface TitleContent {
    type: ContentType.Title,
    title: string
}

type BlogContentType = TextContent | MediaContent | MervContent | ResourcesContent | TitleContent

export type MutateBlogRequest = {
    title: string,
    primaryImage: string,
    shortDescription: string,
    createdDate: Date,
    tags: string[],
    content: BlogContentType[]
}