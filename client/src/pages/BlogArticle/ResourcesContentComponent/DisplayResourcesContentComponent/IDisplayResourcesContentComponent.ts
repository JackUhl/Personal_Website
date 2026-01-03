export enum IDisplayResourcesContentComponentKeys {
    Resources = "resources"
}

export enum ResourceKeys {
    Resource = "resource",
    Link = "link"
}

export interface Resource {
    [ResourceKeys.Resource]: string;
    [ResourceKeys.Link]: string;
}

export const defaultResource: Resource = {
    [ResourceKeys.Resource]: "",
    [ResourceKeys.Link]: ""
}

export default interface IDisplayResourcesContentComponent {
    [IDisplayResourcesContentComponentKeys.Resources]: Resource[];
}