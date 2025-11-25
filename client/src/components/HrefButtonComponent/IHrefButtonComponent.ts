import { ReactElement } from "react";

export default interface IHrefButtonComponent {
    buttonElement: ReactElement;
    href: string;
    openInNewTab?: boolean;
}