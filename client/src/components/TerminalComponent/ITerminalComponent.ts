import { WindowStyle } from "../../models/enums/WindowStyles";

export interface ITerminalComponent {
    text: string;
    path?: string;
    drive?: string
    theme?: WindowStyle;
}