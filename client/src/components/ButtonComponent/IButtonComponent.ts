import { ReactElement } from "react";

export default interface IButtonComponent {
    buttonElement: ReactElement;
    href: string;
    openInNewTab: boolean;
}