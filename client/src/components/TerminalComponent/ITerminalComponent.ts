import { WindowStyle } from "../../models/enums/WindowStyles";

export default interface ITerminalComponent {
    text: string;
    path?: string;
    drive?: string
    theme?: WindowStyle;
}