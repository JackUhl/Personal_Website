import { WindowStyle } from "../../../../models/enums/WindowStyles";

export enum IDisplayMervContentComponentKeys {
    Text = "text",
    Theme = "theme"
}

export default interface IDisplayMervContentComponent {
    [IDisplayMervContentComponentKeys.Text]: string;
    [IDisplayMervContentComponentKeys.Theme]: WindowStyle;
}