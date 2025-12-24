import { PropsWithChildren } from "react";

export default interface IHrefButtonComponent extends PropsWithChildren {
    href: string;
    openInNewTab?: boolean;
}