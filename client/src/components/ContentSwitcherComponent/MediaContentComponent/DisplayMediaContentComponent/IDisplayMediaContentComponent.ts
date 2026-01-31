export enum IDisplayMediaContentComponentKeys {
    Media = "media",
    SubText = "subText"
}

export default interface IDisplayMediaContentComponent {
    [IDisplayMediaContentComponentKeys.Media]: string;
    [IDisplayMediaContentComponentKeys.SubText]?: string
}