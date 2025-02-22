import { ReactElement } from "react";

export interface IButtonComponent {
    buttonElement: ReactElement;
    href: string;
    openInNewTab: boolean;
}