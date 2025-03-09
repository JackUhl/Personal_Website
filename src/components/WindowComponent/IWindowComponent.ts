import { WindowStyle } from "../../models/enums/WindowStyles";

export default interface IWindowComponent extends React.PropsWithChildren {
    title: string;
    theme?: WindowStyle;
}